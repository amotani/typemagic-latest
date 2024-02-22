import { Agent, UserPlanInfo } from "@/utils/types";
import { OpenAIStream } from "../api-utils/openAIStream";
import { kv } from "@vercel/kv";
import { get } from "@vercel/edge-config";
import { NextRequest } from "next/server";
import { db } from "../api-utils/db";
import { VercelRequest, VercelResponse } from "@vercel/node";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  let { idToken, prompt } = req.body as {
    prompt: string;
    idToken: string;
  };

  let popularAgents = (await get("popularAgents")) as string[];

  if (!popularAgents) {
    return res.status(400).send("No popular agents found");
  }

  // OK, now fetch the agents for these popular agents:
  let agents: Agent[] = [];

  console.log("popularAgents", popularAgents);

  await db
    .collection("agents")
    .where("isPublic", "==", true)
    .where("id", "in", popularAgents)
    .get()
    .then((querySnapshot) => {
      const agentMap: { [id: string]: Agent } = {};
      querySnapshot.forEach((doc) => {
        console.log("Got doc: ", doc.data().name);
        agentMap[doc.id] = { id: doc.id, ...doc.data() } as Agent;
      });
      agents = popularAgents.map((id) => agentMap[id]).filter((a) => !!a);
    });

  res.status(200).send(agents);
};

export default handler;
