import { UserPlanInfo } from "@/utils/types";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

const handler = async (request: NextRequest): Promise<Response> => {
  let { idToken } = (await request.json()) as { idToken: string };

  if (!idToken) {
    return new Response("idToken is required", { status: 400 });
  }

  // Fetch the userID from the idToken:
  let userId = btoa(idToken);

  // Fetch the userPlanInfo from kv:

  const key = `userPlanInfo_${userId}`;

  const userPlanInfo = await kv.get(key);

  if (!userPlanInfo) {
    const defaultPlan: UserPlanInfo = {
      messageCount: 0,
      totalMessageCount: 0,
      totalTokenCount: 0,
      currentPlan: 0,
      userPlanLastUpdated: new Date(),
    };
    await kv.set(key, defaultPlan);
    return NextResponse.json(defaultPlan);
  }

  return NextResponse.json(userPlanInfo);
};

export default handler;
