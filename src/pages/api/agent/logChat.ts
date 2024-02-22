import { VercelRequest, VercelResponse } from "@vercel/node";
import { kv } from "@vercel/kv";
import { Agent, AgentStatus, Message, Sender } from "@/utils/types";
import { admin, db, verifyIdToken } from "../api-utils/db";
import va from "@vercel/analytics";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  let { idToken, agentId, chatId, title, model } = req.body as {
    idToken: string;
    agentId: string;
    chatId: string;
    title: string;
    model: string;
  };

  if (!idToken || !agentId || !chatId) {
    return res.status(400).send("Params yo!");
  }

  const agentRef = db.collection("agents").doc(agentId);

  await agentRef
    .collection("chats")
    .doc(chatId)
    .set({
      timestamp: new Date(),
      title: title ? title : "Untitled chat",
      model: model ? model : "",
    });

  await agentRef.update({
    chats: admin.firestore.FieldValue.increment(1),
  });

  console.log("chat logged: ", { agentId, chatId });

  res.status(200).send({ success: true });
};

export default handler;
