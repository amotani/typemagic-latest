import { VercelRequest, VercelResponse } from "@vercel/node";

import { db, verifyIdToken } from "../api-utils/db";
import { deleteKnowledgeSourceIndex } from "../api-utils/knowledge";

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
  let sourceRef = db.collection("knowledge").doc(id);
  let data = await sourceRef.get();

  if (!data.exists) {
    return res.status(404).send("Source not found");
  }

  // First delete index:
  await deleteKnowledgeSourceIndex(id);

  // Delete the content:
  await sourceRef.collection("content").doc("content").delete();

  // Delete the source:
  await sourceRef.delete();

  console.log("Knowledge source deleted: ", id);

  res.status(200).send({ success: true });
};

export default handler;
