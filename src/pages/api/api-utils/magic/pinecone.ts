import { Agent, AgentStatus } from "@/utils/types";
import { createEmbedding } from "..";
import { PineconeClient } from "@pinecone-database/pinecone";

export const getIndex = async (name?: string) => {
  const pinecone = new PineconeClient();
  await pinecone.init({
    environment: process.env.PINECONE_ENVIRONMENT!,
    apiKey: process.env.PINECONE_API_KEY!,
  });

  const index = pinecone.Index(name ? name : "agents");
  return index;
};

export const saveAgentVector = async (agent: Agent) => {
  // Now update the Pinecone index:
  const index = await getIndex();

  // Create the embedding for this agent:
  const embedding = await createEmbedding(
    `Name: ${agent.name}\n Description: ${agent.description}\n Prompt: ${agent.prompt}`
  );

  await index.upsert({
    upsertRequest: {
      vectors: [
        {
          id: agent.id,
          values: embedding,
          metadata: {
            name: agent.name,
            description: agent.description,
            creatorHandle: agent.creatorHandle,
            likes: agent.likes,
            isPublic: agent.isPublic,
            creatorId: agent.creatorId,
            creatorPicture: agent.creatorPicture ? agent.creatorPicture : "",
            status: agent.status ? agent.status : AgentStatus.Processing,
          },
        },
      ],
    },
  });

  console.log("Updated Pinecone.");
};

export const pineconeUpdateMetadata = async (
  agentId: string,
  fields: { [key: string]: any }
) => {
  const index = await getIndex();
  await index.update({
    updateRequest: {
      id: agentId,
      setMetadata: {
        ...fields,
      },
    },
  });
};

export const removeAgentVector = async (agentId: string) => {
  // Now update the Pinecone index:
  const index = await getIndex();
  await index._delete({ deleteRequest: { ids: [agentId] } });
  console.log("Deleted from Pinecone.");
};
