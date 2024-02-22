import { VercelRequest, VercelResponse } from "@vercel/node";
import { cosineSimilarity, createEmbedding } from "../api-utils";
import { kv } from "@vercel/kv";
import { Agent, AgentStatus, Message, Sender } from "@/utils/types";
import { uuidv4 } from "@firebase/util";
import { db, verifyIdToken } from "../api-utils/db";
import { getUserId } from "@/utils/auth";
import { documentId, serverTimestamp } from "firebase/firestore";
import { getHumanReadableIdFromName } from "@/utils";
import { removeAgentVector } from "../api-utils/magic/pinecone";
import { removeAgentAlgolia } from "../api-utils/magic/algolia";
import { removeAgentIndex } from "../api-utils/magic";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  let { idToken, id } = req.body as {
    idToken: string;
    id: string;
  };

  if (!idToken || !id) {
    return res.status(400).send("Params yo!");
  }

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

  // Delete the agent:
  await agentRef.delete();
  console.log("Agent deleted.");
  await agentRef.collection("prompts").doc("main").delete();
  console.log("Agent prompt deleted.");

  // Delete the KV:
  await kv.del(`agent_${id}`);
  console.log("KV deleted.");

  await removeAgentIndex(agentRef.id);

  res.status(200).send({ success: true });
};

export default handler;
