import { VercelRequest, VercelResponse } from "@vercel/node";
import { admin, db, verifyIdToken } from "../api-utils/db";
import { updateAgentIndex } from "../api-utils/magic";
import { User } from "@/utils/types";
import { syncUserAgents } from "../api-utils/user";

const isHandleTaken = async (
  userId: string,
  handle: string
): Promise<boolean> => {
  // Ensure this humanReadableId does not clash with another agent's humanReadableId:
  const existingUsers = await db
    .collection("users")
    .where("handle", "==", handle)
    .where(admin.firestore.FieldPath.documentId(), "!=", userId)
    .get();

  return existingUsers.size > 0;
};

const handler = async (req: VercelRequest, res: VercelResponse) => {
  let { idToken, picture } = req.body as {
    idToken: string;
    picture: string;
  };

  if (!idToken || !picture) {
    return res.status(400).send("Params yo!");
  }

  let userId = await verifyIdToken(idToken);
  if (!userId) {
    return res.status(401).send("Unauthorized");
  }

  let userRef = db.collection("users").doc(userId);
  let userDoc = await userRef.get();
  if (!userDoc.exists) {
    return res.status(404).send("User not found");
  }

  let user = userDoc.data() as User;

  await syncUserAgents(userId, user.handle, user.picture ? user.picture : "");

  // Update the doc:
  await userRef.update({
    picture,
  });

  res.status(200).send({ success: true });
};

export default handler;
