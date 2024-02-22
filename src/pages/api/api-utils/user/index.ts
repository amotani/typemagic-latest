import { db } from "../db";
import { updateAgentIndex } from "../magic";

export const syncUserAgents = async (
  userId: string,
  handle: string,
  picture: string
) => {
  const agents = await db
    .collection("agents")
    .where("creatorId", "==", userId)
    .get();

  const batch = db.batch();
  agents.forEach(async (agent) => {
    batch.update(agent.ref, { creatorHandle: handle });

    // Update the agent index:
    await updateAgentIndex(agent.ref.id, {
      creatorHandle: handle,
      creatorPicture: picture,
    });

    console.log("updating agent w/ latest creatorInfo: ", agent.ref.id);
  });
  await batch.commit();
};
