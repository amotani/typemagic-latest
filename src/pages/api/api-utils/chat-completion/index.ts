import { constants } from "@/styles/constants";
import { ChunkInfo, UserPlanInfo } from "@/utils/types";

export const GPT_4 = "gpt-4";
export const CHAT_GPT = "gpt-3.5-turbo-16k";

export const hasUserCrossedMessageLimit = (
  userPlanInfo: UserPlanInfo
): { error: string } | boolean => {
  let plan = userPlanInfo.currentPlan;

  //@ts-ignore
  if (userPlanInfo.messageCount >= constants.messagesLimit[plan]) {
    return true;
  }
  return false;
};

export const getModelForPlan = (planInfo: UserPlanInfo): string => {
  // First 10 messages for any user are GPT-4 - for the highest quality.
  if (
    planInfo.currentPlan === 0 &&
    planInfo.totalMessageCount < constants.trialMessageLimit
  ) {
    return GPT_4;
  }
  if (planInfo.currentPlan === 2) return GPT_4;
  return CHAT_GPT;
};

export const getEmbedding = async (userMessage: string) => {
  let url = "https://api.openai.com/v1/embeddings";
  let headers = {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    "Content-Type": "application/json",
  };
  let body = {
    input: userMessage,
    model: "text-embedding-ada-002",
  };

  let resp = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  const data = await resp.json();
  return data["data"][0]["embedding"];
};

export const getChunksForAgent = async (
  messages: { role: string; content: string }[],
  sourceIds: string[],
  threshold: number
) => {
  // First create an embedding for this userMessage:

  // Construct sum of all user messages:
  let userMessage = "";
  messages.forEach((message) => {
    if (message.role === "user") {
      userMessage += message.content;
    }
  });

  const vector = await getEmbedding(userMessage);

  const resp = await fetch(
    "https://knowledge-6a77849.svc.us-east4-gcp.pinecone.io/query",
    {
      method: "POST",
      headers: {
        "Api-Key": process.env.PINECONE_API_KEY as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vector,
        filter: { sourceId: { $in: sourceIds } },
        topK: 5,
        includeValues: false,
        includeMetadata: true,
      }),
    }
  );

  const data = await resp.json();

  const matches = data["matches"];

  const out: ChunkInfo[] = [];
  matches.map((match: any) => {
    out.push({
      id: match.id,
      score: match.score,
      chunk: match.metadata.chunk,
      title: match.metadata.title,
      url: match.metadata.url,
      sourceId: match.metadata.sourceId,
    });
  });

  console.log("getChunksForAgent(): ", {
    sourceIds: sourceIds.length,
    userMessage,
    matches: out.map((match) => ({ title: match.title, score: match.score })),
  });

  return out;
};

export const constructChunksPrompt = (
  agentPrompt: string | null,
  chunks: ChunkInfo[]
): string => {
  // Given chunks, return a prompt.

  const getChunkBlock = (chunk: ChunkInfo) => {
    let out = "";
    out += `Title: ${chunk.title}, URL: ${chunk.url}, \n\n`;
    out += chunk.chunk + "\n\n";
    return out;
  };

  let chunksPrompt = "";
  chunks.forEach((chunk) => {
    chunksPrompt += getChunkBlock(chunk);
  });

  let prompt = `.
  KNOWLEDGE SOURCES:
  
  ${chunksPrompt}

  `;

  return agentPrompt ? agentPrompt + prompt : prompt;
};

export const constructBasePrompt = (agentPrompt: string | null): string => {
  let basePrompt = `You are an agent named Typemagic who is helping a user named User with their question. You are a human, but you have access to the following contexts to help you answer the user's question:\n\n`;
  if (agentPrompt) basePrompt = `${agentPrompt}\n`;
  return basePrompt;
};
