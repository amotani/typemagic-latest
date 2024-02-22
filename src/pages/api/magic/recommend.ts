import { VercelRequest, VercelResponse } from "@vercel/node";
import { cosineSimilarity, createEmbedding } from "../api-utils";
import { kv } from "@vercel/kv";
import { Agent, Message, Sender } from "@/utils/types";
import { uuidv4 } from "@firebase/util";
import { db } from "../api-utils/db";
import { getIndex } from "../api-utils/magic/pinecone";

const getUserInputString = (messages: Message[]) => {
  // construct userMessage as concatenation of all user messages:
  let userMessage = "";
  messages.map((message) => {
    if (message.sender !== Sender.User) return;
    userMessage += message.content + " ";
  });
  return userMessage;
};

const handler = async (req: VercelRequest, res: VercelResponse) => {
  let { idToken, messages, chatId } = req.body as {
    idToken: string;
    messages: Message[];
    chatId?: string;
  };

  if (!idToken || !messages) {
    return res.status(400).send("Params yo!");
  }

  const userId = btoa(idToken);

  const userVector = await createEmbedding(getUserInputString(messages));

  const index = await getIndex();

  const queryResponse = await index.query({
    queryRequest: {
      vector: userVector,
      topK: 10,
      includeMetadata: true,
      includeValues: false,
      filter: {
        $or: [{ isPublic: { $eq: true } }, { creatorId: { $eq: userId } }],
      },
    },
  });

  const THRESHOLD = 0.7;

  let agents: Agent[] = [];
  queryResponse.matches?.forEach((match) => {
    match.score = match.score ? match.score : 0;
    if (match.score > THRESHOLD)
      agents.push({ id: match.id, ...match.metadata } as Agent);
  });

  res.status(200).send(agents);
};

export default handler;
