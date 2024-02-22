import { VercelRequest, VercelResponse } from "@vercel/node";
import { cosineSimilarity, createEmbedding } from "../api-utils";
import { db, verifyIdToken } from "../api-utils/db";
import { serverTimestamp } from "firebase/firestore";
import { saveKnowledgeSourceIndex } from "../api-utils/knowledge";
import { constants } from "@/styles/constants";

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

  let ref = db.collection("knowledge").doc(id);

  let source = {
    title: fields.title,
    url: fields.url,
    lastEdited: new Date(),
    creatorId: userId,
  };

  let content = fields.content;

  if (
    content.length > constants.validations.knowledgeContent.maxLength ||
    source.title.length > constants.validations.knowledgeTitle.maxLength ||
    source.url.length > constants.validations.knowledgeUrl.maxLength
  ) {
    return res.status(400).send("Fields too long.");
  }

  await saveKnowledgeSourceIndex(id, source.title, source.url, content);
  console.log("Saved knowledge source index in Pinecone.");

  // This has to come first!
  await ref
    .collection("content")
    .doc("content")
    .set({ content, creatorId: userId }, { merge: true });

  await ref.set(source, { merge: true });
  console.log("Saved knowledge source metadata in Firestore.");

  console.log("Saved knowledge source content in Firestore.");

  res.status(200).send({ success: true });
};

export default handler;
