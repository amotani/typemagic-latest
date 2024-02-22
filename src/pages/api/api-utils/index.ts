import { Configuration, OpenAIApi } from "openai";

// Your OpenAI API key goes here
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAIApi(new Configuration({ apiKey }));

export async function createEmbedding(text: string): Promise<number[]> {
  const parameters = {
    model: "text-embedding-ada-002",
    input: text,
  };
  const response = await openai.createEmbedding(parameters);
  return response.data.data[0].embedding;
}

export async function createEmbeddings(texts: string[]): Promise<number[][]> {
  const parameters = {
    model: "text-embedding-ada-002",
    input: texts,
  };
  const response = await openai.createEmbedding(parameters);
  return response.data.data.map((d: any) => d.embedding);
}

export function cosineSimilarity(A: number[], B: number[]) {
  var dotproduct = 0;
  var mA = 0;
  var mB = 0;

  for (var i = 0; i < A.length; i++) {
    dotproduct += A[i] * B[i];
    mA += A[i] * A[i];
    mB += B[i] * B[i];
  }

  mA = Math.sqrt(mA);
  mB = Math.sqrt(mB);
  var similarity = dotproduct / (mA * mB);

  return similarity;
}
