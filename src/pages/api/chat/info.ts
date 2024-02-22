import { VercelRequest, VercelResponse } from "@vercel/node";
import { db, verifyIdToken } from "../api-utils/db";
import { Chat } from "@/utils/types";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  let { idToken, id, agentId } = req.body as {
    idToken: string;
    id: string;
    agentId: string;
  };

  if (!idToken || !id || !agentId) {
    return res.status(400).send("Params yo!");
  }

  let userId = await verifyIdToken(idToken);

  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  console.log("info(): ", { id, agentId });

  // Get the chat:
  const data = await db.collection("chats").doc(id).get();
  if (!data.exists) return res.status(404).send("Chat not found");
  const chat = data.data() as Chat;

  let foundAgent = false;
  for (let message of chat.messages) {
    if (message.agentUsed && message.agentUsed === agentId) {
      foundAgent = true;
      break;
    }
  }

  if (!foundAgent) return res.status(404).send("Agent not found in chat.");

  console.log("sending back: ", chat);

  // Return the chat:
  return res.status(200).send(chat);
};

export default handler;
