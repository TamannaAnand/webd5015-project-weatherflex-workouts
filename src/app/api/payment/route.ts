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
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile/success`,
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
