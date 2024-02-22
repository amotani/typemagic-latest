import { Agent } from "@/utils/types";

// For the default version
import algoliasearch from "algoliasearch";

// For the default version
// import algoliasearch from 'algoliasearch';

// For the search only version
// import algoliasearch from 'algoliasearch/lite';

const getIndex = () => {
  const client = algoliasearch("P2GVB0HBVC", process.env.ALGOLIA_ADMIN_KEY!);
  const index = client.initIndex("agents");
  return index;
};

export const algoliaIndexAgent = async (agent: Agent) => {
  const index = getIndex();
  await index.saveObject({
    objectID: agent.id,
    name: agent.name,
    humanReadableId: agent.humanReadableId,
    description: agent.description,
    creatorHandle: agent.creatorHandle,
    creatorId: agent.creatorId,
    creatorPicture: agent.creatorPicture || "",
    isPublic: agent.isPublic,
    status: agent.status,
    likes: agent.likes,
  });
  console.log("Algolia saved.");
};

export const getSearchKey = (userId: string): string => {
  const client = algoliasearch("P2GVB0HBVC", process.env.ALGOLIA_ADMIN_KEY!);
  const key = client.generateSecuredApiKey(
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
    {
      filters: `(creatorId:${userId} OR isPublic:true)`,
    }
  );
  return key;
};

export const removeAgentAlgolia = async (agentId: string) => {
  const index = getIndex();
  await index.deleteObject(agentId);
  console.log("Algolia deleted.");
};

export const algoliaUpdate = async (
  agentId: string,
  fields: { [key: string]: any }
) => {
  const index = getIndex();
  await index.partialUpdateObject({
    objectID: agentId,
    ...fields,
  });
};
