import { VercelRequest, VercelResponse } from "@vercel/node";
import { cosineSimilarity, createEmbedding } from "../api-utils";
import { kv } from "@vercel/kv";
import { Agent, AgentStatus, Message, Sender } from "@/utils/types";
import { uuidv4 } from "@firebase/util";
import { admin, db, verifyIdToken } from "../api-utils/db";
import { getUserId } from "@/utils/auth";
import { FieldPath, documentId, serverTimestamp } from "firebase/firestore";
import { getHumanReadableIdFromName } from "@/utils";
import { nanoid } from "nanoid";
import { saveAgentVector } from "../api-utils/magic/pinecone";
import { indexAgent } from "../api-utils/magic";
import { constants } from "@/styles/constants";

const generateHumanReadableId = async (
  agentId: string,
  name: string
): Promise<string> => {
  const newId = getHumanReadableIdFromName(name);

  // Ensure this humanReadableId does not clash with another agent's humanReadableId:
  const existingAgents = await db
    .collection("agents")
    .where("humanReadableId", "==", newId)
    .where(admin.firestore.FieldPath.documentId(), "!=", agentId)
    .get();

  if (existingAgents.size > 0) {
    // There is a clash, so update:
    return `${newId}_${nanoid(6)}`;
  } else {
    return newId;
  }
};

// https://docs.pinecone.io/docs/manage-data -> Update only the Pinecone metadata as needed.
// TODO: Put server side restrictions on the size of the fields.
const handler = async (req: VercelRequest, res: VercelResponse) => {
  let { idToken, id, fields } = req.body as {
    idToken: string;
    id: string;
    fields: { [key: string]: any };
  };

  if (!idToken || !id || !fields) {
    return res.status(400).send("Params yo!");
  }

  let userId = await verifyIdToken(idToken);

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  let agentRef = db.collection("agents").doc(id);
  let agentData = await agentRef.get();

  let agent: Agent;

  const getRecommendedQuestions = (): string[] | undefined => {
    if (fields.recommendedQuestions) {
      let reccs = fields.recommendedQuestions.split("\n");

      // Only take at most 3 reccs:
      if (reccs.length > 3) {
        reccs = reccs.slice(0, 3);
      }

      return reccs;
    }
  };

  if (!agentData.exists) {
    // Create the agent:

    // Get the user:
    const userData = await db.collection("users").doc(userId).get();
    if (!userData.exists) return res.status(404).send("User not found");
    let user = userData.data();
    if (!user) return res.status(404).send("User not found");

    console.log("found the user to save for: ", user.handle);

    const humanReadableId = await generateHumanReadableId(id, fields.name);

    agent = {
      id: agentRef.id,
      name: fields.name,
      humanReadableId,
      isPublic: false,
      description: fields.description,
      creatorId: userId,
      creatorHandle: user.handle,
      creatorPicture: user.picture,
      likes: 0,
      chats: 0,
      status: AgentStatus.AppearsInSearch,
      lastEdited: new Date(),
    };

    if (
      agent.name.length > constants.validations.agentName.maxLength ||
      agent.description.length >
        constants.validations.agentDescription.maxLength ||
      fields.prompt.length > constants.validations.agentPrompt.maxLength ||
      fields.recommendedQuestions.length >
        constants.validations.recommendedQuestions.maxLength
    ) {
      return res.status(400).send("Too long!");
    }

    console.log("fields: ", fields);

    let reccs = getRecommendedQuestions();
    if (reccs) agent.recommendedQuestions = reccs;

    await agentRef.set(agent);

    console.log("agent created: ", agentRef.id);
  } else {
    agent = { id: agentRef.id, ...agentData.data() } as Agent;

    console.log("About to update: ");

    // Kick them out if they shouldn't be here!
    if (agent.creatorId !== userId) return res.status(401).send("Unauthorized");

    let humanReadableId = agent.humanReadableId;

    if (agent.name !== fields.name) {
      // Need to get the new humanReadableId:
      humanReadableId = await generateHumanReadableId(id, fields.name);
    }

    const agentToUpdate = {
      name: fields.name,
      humanReadableId,
      description: fields.description,
    };

    let reccs = getRecommendedQuestions();
    // @ts-ignore
    if (reccs) agentToUpdate.recommendedQuestions = reccs;

    // Update agent:
    await agentRef.update(agentToUpdate);

    //@ts-ignore
    agent = { ...agent, agentToUpdate };

    console.log("agent updated: ", agentRef.id);
  }

  const prompt = fields.prompt;

  // Update the prompt:
  if (fields.prompt) {
    await db
      .collection("agents")
      .doc(id)
      .collection("prompts")
      .doc("main")
      .set({ prompt, creatorId: userId });

    console.log("updated prompt");
  }

  // Update agent lastEdited:
  await agentRef.update({ lastEdited: new Date() });

  // Update KV:
  let val = (await kv.get(`agent_${id}`)) as { [key: string]: any };
  if (!val) val = { isPublic: false };
  await kv.set(`agent_${id}`, {
    ...val,
    prompt,
    creatorId: userId,
  });
  console.log("Update KV.");

  await indexAgent(agent);

  res.status(200).send({ success: true });
};

export default handler;
