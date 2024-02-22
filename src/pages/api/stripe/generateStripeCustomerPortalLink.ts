import { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { verifyIdToken } from "../api-utils/db";
import { db } from "../api-utils/db";
import { isDevelopmentEnvironment } from "@/utils";
import { kv } from "@vercel/kv";
import { UserPlanInfo } from "@/utils/types";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    apiVersion: "2022-11-15",
  });

  const { idToken } = req.body;

  if (!idToken) {
    res.status(400).json({ error: "Missing or invalid idToken parameter" });
    return;
  }

  // Get user for idToken:
  const userId = await verifyIdToken(idToken);

  if (!userId) {
    res.status(401).json({ error: "Invalid user." });
    return;
  }

  const key = `userPlanInfo_${userId}`;
  const userPlanInfo = (await kv.get(key)) as UserPlanInfo;

  if (!userPlanInfo || !userPlanInfo.stripeCustomerId) {
    return res.status(401).json({ error: "Invalid plan info not available." });
  }

  const returnUrl = isDevelopmentEnvironment()
    ? "http://localhost:3000/plans"
    : "https://typemagic.com/plans";

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: userPlanInfo.stripeCustomerId!,
    return_url: returnUrl,
  });

  res.json({ sessionUrl: portalSession.url });
};

export default handler;
