import { UserPlanInfo } from "@/utils/types";
import { OpenAIStream } from "../api-utils/openAIStream";
import { kv } from "@vercel/kv";
import { get } from "@vercel/edge-config";
import { NextRequest } from "next/server";
import { createEmbedding } from "../api-utils";
import { getIndex } from "../api-utils/magic/pinecone";
import { VercelRequest, VercelResponse } from "@vercel/node";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  let { idToken, prompt } = req.body as {
    prompt: string;
    idToken: string;
  };

  const userVector = await createEmbedding(prompt);

  const index = await getIndex();

  const queryResponse = await index.query({
    queryRequest: {
      vector: userVector,
      topK: 1,
      includeMetadata: true,
      includeValues: false,
      filter: {
        isPublic: { $eq: true },
      },
    },
  });

  const THRESHOLD = 0.7;
  let agent = null;
  queryResponse.matches?.forEach((match) => {
    match.score = match.score ? match.score : 0;
    if (match.score > THRESHOLD) agent = { id: match.id, ...match.metadata };
  });

  res.status(200).send(agent);
};

export default handler;
