import { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { verifyIdToken } from "../api-utils/db";
import { db } from "../api-utils/db";
import { isDevelopmentEnvironment } from "@/utils";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    apiVersion: "2022-11-15",
  });

  const { priceId, idToken } = req.body;

  if (!priceId || !idToken) {
    res
      .status(400)
      .json({ error: "Missing or invalid producId / idToken parameter" });
    return;
  }

  // Get user for idToken:
  const userId = await verifyIdToken(idToken);

  if (!userId) {
    res.status(401).json({ error: "Invalid user." });
    return;
  }

  // Fetch user for userId:
  // Fetch user with userId:
  const userRef = db.collection("users").doc(userId);
  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    return res.status(400).json({ error: "User does not exist" });
  }
  const user = userDoc.data();
  if (!user) return res.status(401).json({ error: "Invalid user." });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        // For metered billing, do not pass quantity
        quantity: 1,
      },
    ],
    // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
    // the actual Session ID is returned in the query parameter when your customer
    // is redirected to the success page.
    success_url: isDevelopmentEnvironment()
      ? "http://localhost:3000/plans"
      : "https://typemagic.com/plans",
    customer_email: user.email,
  });

  res.json({ sessionUrl: session.url });
};

export default handler;
