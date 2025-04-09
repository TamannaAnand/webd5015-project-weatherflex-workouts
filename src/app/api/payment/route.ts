import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/utils/prismaDB";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
  });
  const data = await request.json();
  const { priceId, userId } = data;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile`,
  });

  try {
    // update the user's subscription status
    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionStatus: "Premium",
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log("User Subscription Status Updated Failed : ", error);
  }

  return NextResponse.json(session.url);
}

export async function GET(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
  });

  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id");

  if (!session_id) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      return NextResponse.json({ success: true, customer_email: session.customer_email });
    } else {
      return NextResponse.json({ success: false, message: "Payment not completed" }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json({ error: "Stripe verification failed" }, { status: 500 });
  }
}
