import { VercelRequest, VercelResponse } from "@vercel/node";
import { cosineSimilarity, createEmbedding } from "../api-utils";
import { kv } from "@vercel/kv";
import { Agent, AgentStatus, Message, Sender } from "@/utils/types";
import { uuidv4 } from "@firebase/util";
import { db, verifyIdToken } from "../api-utils/db";
import { updateAgentIndex } from "../api-utils/magic";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  let { idToken, id, isPublic } = req.body as {
    idToken: string;
    id: string;
    isPublic: boolean;
  };

  if (!idToken || !id) {
    return res.status(400).send("Params yo!");
  }

  // Ensure boolean;
  isPublic = isPublic ? true : false;

  let userId = await verifyIdToken(idToken);

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  // Get the agent:
  let agentRef = db.collection("agents").doc(id);
  let agentData = await agentRef.get();

  if (!agentData.exists) {
    return res.status(404).send("Agent not found");
  }
  let agent = agentData.data() as Agent;

  if (agent.creatorId !== userId) {
    return res.status(401).send("Unauthorized");
  }

  // Update the agent:
  await agentRef.update({
    isPublic,
  });
  console.log("Agent updated.");

  // Update the KV:
  let val = (await kv.get(`agent_${id}`)) as { [key: string]: any };
  if (!val) {
    console.log("THIS SHOULD NEVEEEEER HAPPEN -> why is KV empty?");
    val = { creatorId: userId, prompt: "" };
  }
  await kv.set(`agent_${id}`, {
    ...val,
    isPublic,
  });

  console.log("KV updated.");

  await updateAgentIndex(id, { isPublic });

  res.status(200).send({ success: true });
};

export default handler;
