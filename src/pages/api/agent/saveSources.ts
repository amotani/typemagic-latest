import { VercelRequest, VercelResponse } from "@vercel/node";
import { Agent } from "@/utils/types";
import { db, verifyIdToken } from "../api-utils/db";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  let { idToken, id, knowledgeSources } = req.body as {
    idToken: string;
    id: string;
    knowledgeSources: string[];
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

  // Update the agent:
  await agentRef.update({
    knowledgeSources,
  });
  console.log("Agent updated.");

  res.status(200).send({ success: true });
};

export default handler;
