import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prismaDB";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
  });

  // Verify the webhook to ensure it's genuinely from Stripe
  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: `Webhook Error: ${err}` }, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Extract the customer's email from the session
    const customerEmail = session.customer_email;

    if (customerEmail) {
      // Update the user's subscription status
      await prisma.user.update({
        where: { email: customerEmail },
        data: { subscription_status: "premium" }
      });
    }
  }

  return NextResponse.json({ received: true });
}