import { ChunkInfo } from "@/utils/types";
import { NextRequest } from "next/server";
import { getChunksForAgent } from "../api-utils/chat-completion";
import { constants } from "@/styles/constants";

export const config = {
  runtime: "edge",
};

const handler = async (req: NextRequest): Promise<Response> => {
  let { idToken, messages, activeAgentId, contentIds } = (await req.json()) as {
    messages: { role: string; content: string }[];
    activeAgentId: string;
    idToken: string;
    contentIds?: string[];
  };

  if (!idToken || !messages || !activeAgentId || !contentIds) {
    return new Response("Params yo!", { status: 400 });
  }

  let sources: { id: string; url: string; title: string }[] = [];

  let usedSources = new Set<string>();

  const chunks: ChunkInfo[] = await getChunksForAgent(
    messages,
    contentIds,
    constants.chatCompletionChunkSimilarityThreshold
  );

  for (const chunk of chunks) {
    if (usedSources.has(chunk.sourceId)) continue;
    sources.push({
      id: chunk.sourceId,
      url: chunk.url,
      title: chunk.title,
    });
    usedSources.add(chunk.sourceId);
  }

  return new Response(JSON.stringify({ sources }), { status: 200 });
};

export default handler;
