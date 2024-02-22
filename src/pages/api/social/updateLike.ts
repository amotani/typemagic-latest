import { VercelRequest, VercelResponse } from "@vercel/node";
import { admin, db, verifyIdToken } from "../api-utils/db";
import { updateAgentIndex } from "../api-utils/magic";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  let { idToken, agentId, like } = req.body as {
    idToken: string;
    agentId: string;
    like: boolean;
  };

  if (!idToken || !agentId) {
    return res.status(400).send("Params yo!");
  }

  like = like ? true : false;

  let userId = await verifyIdToken(idToken);
  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  // 1. If this user has already liked this agent, do nothing:
  const likedRef = db
    .collection("agents")
    .doc(agentId)
    .collection("whoLiked")
    .doc(userId);
  const likedData = await likedRef.get();

  // If the like value to set already matches the current value, do absolutely nothing:
  if (likedData.exists) {
    const likeInfo = likedData.data() as { like: boolean; likedAt: Date };
    if (likeInfo.like === like) return res.status(200).send({ success: true });
  }

  if (like) {
    // Update the value
    await likedRef.set({ like: true, likedAt: new Date() });
  } else {
    // Delete the doc:
    await likedRef.delete();
  }
  console.log("updated like");

  // Increment / decrement agent.social:
  const agentRef = db.collection("agents").doc(agentId);
  await agentRef.update({
    likes: admin.firestore.FieldValue.increment(like ? 1 : -1),
  });

  // Get the latest likes and save:
  const data = await agentRef.get();
  if (data.exists) {
    const likes = data.data()?.likes;

    if (likes !== undefined) updateAgentIndex(agentRef.id, { likes });
  }

  res.status(200).send({ success: true });
};

export default handler;
