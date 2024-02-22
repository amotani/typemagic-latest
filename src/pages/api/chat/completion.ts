import { AgentKVData, ChunkInfo, UserPlanInfo } from "@/utils/types";
import { OpenAIStream } from "../api-utils/openAIStream";
import { kv } from "@vercel/kv";

import { NextRequest } from "next/server";
import {
  constructBasePrompt,
  constructChunksPrompt,
  getChunksForAgent,
  getModelForPlan,
  hasUserCrossedMessageLimit,
} from "../api-utils/chat-completion";
import { constants } from "@/styles/constants";

export const config = {
  runtime: "edge",
};

const handler = async (req: NextRequest): Promise<Response> => {
  let { idToken, messages, chatId, activeAgentId, contentIds } =
    (await req.json()) as {
      messages: { role: string; content: string }[];
      chatId: string;
      activeAgentId?: string;
      idToken: string;
      contentIds?: string[];
    };

  if (!idToken || !messages || !chatId) {
    return new Response("Params yo!", { status: 400 });
  }

  console.log("chatCompletion(): ", { activeAgentId, contentIds });

  // Fetch the userID from the idToken:
  // LOL. TODO: Actually verify the idToken...
  let userId = btoa(idToken);

  let messagesToSend = [...messages];

  let agentPrompt: string | null = null;
  if (activeAgentId) {
    const kvData = (await kv.get(`agent_${activeAgentId}`)) as AgentKVData;
    if (kvData) {
      agentPrompt = kvData.prompt;

      // Check if this user can chat with this agent:
      if (!kvData.isPublic && kvData.creatorId !== userId) {
        return new Response("Unauthorized", { status: 401 });
      }
    }
  }

  let temperature = 0.6;

  // If agent prompt starts with <t:0.6>, then use that temperature, and remove the prefix from prompt:
  if (agentPrompt && agentPrompt.startsWith("<t:")) {
    // Get the temperature:
    const tempStr = agentPrompt.slice(3, 6);
    temperature = parseFloat(tempStr);

    // Remove the temperature from the prompt:
    agentPrompt = agentPrompt.slice(7);

    console.log("temperature: ", temperature);
    console.log("remaining prompt: ", agentPrompt);
  } else {
    console.log("No temperature in prompt, so using 0.6");
  }

  let basePrompt;
  if (activeAgentId && contentIds) {
    // Get the chunks for this agent:
    const chunks: ChunkInfo[] = await getChunksForAgent(
      messages,
      contentIds,
      constants.chatCompletionChunkSimilarityThreshold
    );
    basePrompt = constructChunksPrompt(agentPrompt, chunks);
  } else {
    basePrompt = constructBasePrompt(agentPrompt);
  }

  // Print first 50 characters of the prompt...
  console.log("basePrompt: ", basePrompt.slice(0, 50));

  messagesToSend.unshift({
    role: "system",
    content: basePrompt,
  });

  const planInfoKey = `userPlanInfo_${userId}`;
  const userPlanInfo = (await kv.get(planInfoKey)) as UserPlanInfo;
  let model = getModelForPlan(userPlanInfo);

  const payload = {
    model,
    messages: messagesToSend,
    stream: true,
    user: userId,
    temperature,
  };

  console.log("payload: ", payload);

  let userCrossedLimit;
  userCrossedLimit = hasUserCrossedMessageLimit(userPlanInfo);
  if (userCrossedLimit)
    return new Response("User has crossed message limit", { status: 400 });

  const onComplete = async (message: string) => {
    // Update the user's message count:
    const planInfoKey = `userPlanInfo_${userId}`;
    const userPlanInfo = (await kv.get(planInfoKey)) as UserPlanInfo;
    if (userPlanInfo) {
      kv.set(planInfoKey, {
        ...userPlanInfo,
        messageCount: userPlanInfo.messageCount + 1,
        totalMessageCount: userPlanInfo.totalMessageCount + 1,
      });
    } else {
      console.log("No user plan info.");
    }
  };

  const onError = (error: string) => {
    console.log("Error in chat completion: ", error);

    return new Response("Error in chat completion", { status: 500 });
  };

  try {
    const stream = await OpenAIStream(payload, onComplete, onError);
    let resp = new Response(stream);
    return resp;
  } catch (e) {
    console.log("Error in chat completion: ", e);
    return new Response("Error in chat completion", { status: 500 });
  }
};

export default handler;
