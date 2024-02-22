import { VercelRequest, VercelResponse } from "@vercel/node";
import { admin, db, verifyIdToken } from "../api-utils/db";
import { updateAgentIndex } from "../api-utils/magic";
import { User } from "@/utils/types";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  let { handle } = req.body as {
    handle: string;
  };

  if (!handle) {
    return res.status(400).send("Params yo!");
  }

  const data = await db.collection("users").where("handle", "==", handle).get();
  if (!data.empty) {
    const user = data.docs[0].data();
    return res
      .status(200)
      .send({ bio: user.bio, handle: user.handle, picture: user.picture });
  }

  res.status(400).send("User not found");
};

export default handler;
