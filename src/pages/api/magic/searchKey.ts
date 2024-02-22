import { VercelRequest, VercelResponse } from "@vercel/node";
import { db, verifyIdToken } from "../api-utils/db";
import { getSearchKey } from "../api-utils/magic/algolia";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  let { idToken } = req.body as {
    idToken: string;
  };

  if (!idToken) {
    return res.status(400).send("Params yo!");
  }

  const userId = await verifyIdToken(idToken);
  if (!userId) return res.status(401).send("Unauthorized");
  const key = getSearchKey(userId);
  res.status(200).send({ key });
};

export default handler;
