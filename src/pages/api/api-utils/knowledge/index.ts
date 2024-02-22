// Pinecone interface for the knowledge sources:

import { constants } from "@/styles/constants";
import { getIndex } from "../magic/pinecone";
import { createEmbedding, createEmbeddings } from "..";

const splitContentIntoChunks = (content: string) => {
  // Split the content into chunks of 500 characters.
  let chunks = [];
  for (let i = 0; i < content.length; i += constants.knowledgeChunkSize) {
    chunks.push(content.slice(i, i + constants.knowledgeChunkSize));
  }
  return chunks;
};

export const saveKnowledgeSourceIndex = async (
  id: string,
  title: string,
  url: string,
  content: string
) => {
  const contentIndex = await getIndex("knowledge");
  //1. Delete all chunks in Pinecone related to this knowledge source:
  await deleteKnowledgeSourceIndex(id);

  let chunks = splitContentIntoChunks(content);
  let embeddings = await createEmbeddings(chunks);

  console.log("Created embeddings.", embeddings.length);

  //3. Save all chunk vectors in Pinecone with { title, url, sourceId } as metadata.
  await contentIndex.upsert({
    upsertRequest: {
      vectors: chunks.map((chunk, i) => {
        return {
          id: `${id}-${i}`,
          values: embeddings[i],
          metadata: {
            title,
            url,
            chunk,
            sourceId: id,
          },
        };
      }),
    },
  });

  console.log("Saved knowledge source chunks in Pinecone. ", chunks.length);
};

export const deleteKnowledgeSourceIndex = async (id: string) => {
  // Delete all chunks in Pinecone where sourceId=id.

  const contentIndex = await getIndex("knowledge");

  await contentIndex._delete({
    deleteRequest: {
      filter: {
        sourceId: id,
      },
    },
  });

  console.log("Deleted knowledge source chunks for source: ", id);
};
