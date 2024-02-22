import { VercelRequest, VercelResponse } from "@vercel/node";
import { db, admin, verifyIdToken } from "../api-utils/db";
import { Agent } from "@/utils/types";
import { indexAgent } from "../api-utils/magic";

// // This file will index all of the "alpha" agents.
// const handler = async (req: VercelRequest, res: VercelResponse) => {
//   // OK, we got valid userId and context obj.

//   //   AGENTS.map(async (agent) => {
//   //     saveAgent(agent);
//   //   });

//   const data = await db.collection("agents").get();
//   data.docs.map(async (doc) => {
//     const agent = { id: doc.id, ...doc.data() } as Agent;

//     await indexAgent(agent);
//     console.log("Agent indexed: ", agent.name);
//   });

//   return res.status(200).send({ message: "Agents updated!" });
// };
// export default handler;
