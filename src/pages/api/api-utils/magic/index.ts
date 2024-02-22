// Manage the search and recommendations in the same place.

import { Agent } from "@/utils/types";
import {
  pineconeUpdateMetadata,
  removeAgentVector,
  saveAgentVector,
} from "./pinecone";
import {
  algoliaIndexAgent,
  algoliaUpdate,
  removeAgentAlgolia,
} from "./algolia";

export const indexAgent = async (agent: Agent) => {
  // Update Pinecone:
  await saveAgentVector(agent);
  // Update algolia:
  await algoliaIndexAgent(agent);
};

export const updateAgentIndex = async (
  agentId: string,
  fields: { [key: string]: any }
) => {
  // Update Pinecone:
  await pineconeUpdateMetadata(agentId, fields);
  // Update algolia:
  await algoliaUpdate(agentId, fields);
};

export const removeAgentIndex = async (agentId: string) => {
  // Delete pinecone:
  await removeAgentVector(agentId);
  // Delete algolia:
  await removeAgentAlgolia(agentId);
};
