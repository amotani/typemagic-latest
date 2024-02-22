import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { buffer } from "micro";
import { kv } from "@vercel/kv";
import { db, getUserIdForEmail } from "../api-utils/db";
import { UserPlanInfo } from "@/utils/types";

export const config = { api: { bodyParser: false } };

const handler = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "POST") {
    const stripe = new Stripe(process.env.STRIPE_SECRET!, {
      apiVersion: "2022-11-15",
    });

    const signature = req.headers["stripe-signature"]!;

    let event;

    let webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    const reqBuffer = await buffer(req);

    try {
      event = stripe.webhooks.constructEvent(
        reqBuffer,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(err);
      return res.status(400).send(`Webhook error: ${err}`);
    }

    //    console.log("WEBHOOK!", event);

    if (event.type === "checkout.session.completed") {
      console.log("checkout completed!");
      // Payment is successful and the subscription is created.
      // You should provision the subscription and save the customer ID to your database.

      //@ts-ignore
      const customer = event.data.object.customer as string;
      //@ts-ignore
      const email = event.data.object.customer_email as string;

      console.log("customer", customer);
      console.log("email", email);

      let userId = await getUserIdForEmail(email);
      if (!userId) return res.status(400).send(`No user found for ${email}`);

      // Update the user's plan info:
      const key = `userPlanInfo_${userId}`;
      const userPlanInfo = await kv.get(key);

      console.log("about to set the KV for the customerId ", customer);
      // Update:
      await kv.set(key, {
        ...(userPlanInfo as UserPlanInfo),
        stripeCustomerId: customer,
      });

      console.log("KV updated with stripeCustomerId.");
      return res.status(200).send("OK");
    }

    if (event.type === "invoice.paid") {
      console.log("invoice paid!");
      // Continue to provision the subscription as payments continue to be made.
      // Store the status in your database and check when a user accesses your service.
      // This approach helps you avoid hitting rate limits.

      //@ts-ignore
      const email = event.data.object.customer_email as string;
      //@ts-ignore
      const subtotal = (event.data.object.subtotal as number) / 100;

      const userId = await getUserIdForEmail(email);
      if (!userId) return res.status(400).send(`No user found for ${email}`);

      // Update the user's plan info:
      const key = `userPlanInfo_${userId}`;
      const userPlanInfo = await kv.get(key);

      let currentPlan = subtotal < 20 && subtotal > 0 ? 1 : 2;

      await kv.set(key, {
        ...(userPlanInfo as UserPlanInfo),
        currentPlan,
      });

      console.log("KV updated with currentPlan.", { currentPlan, subtotal });

      return res.status(200).send("OK");
    }

    if (event.type === "invoice.payment_failed") {
      // The payment failed or the customer does not have a valid payment method.
      // The subscription becomes past_due. Notify your customer and send them to the
      // customer portal to update their payment information.

      // Revert the user back to the free plan:
      //@ts-ignore
      const email = event.data.object.customer_email as string;

      const userId = await getUserIdForEmail(email);
      if (!userId) return res.status(400).send(`No user found for ${email}`);

      // Update the user's plan info:
      const key = `userPlanInfo_${userId}`;
      const userPlanInfo = await kv.get(key);

      kv.set(key, {
        ...(userPlanInfo as UserPlanInfo),
        currentPlan: 0,
      });

      console.log("invoice.payment_failed -> KV updated with currentPlan=0.");

      return;
    }

    res.send({ received: true });
  } else {
    res.send({ Poop: true });
  }
};

export default handler;
