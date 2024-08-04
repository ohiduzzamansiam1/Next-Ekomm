import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function POST(request: Request) {
  const body = await request.text();

  const signature = headers().get("Stripe-Signature") as string;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: unknown) {
    return new Response("Webhook Error", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      {
        const session = event.data.object;

        await db.order.create({
          data: {
            userId: session.metadata?.userId ?? "",
            productId: session.metadata?.productId ?? "",
            pricePaidInCents: session.amount_total ?? 0,
          },
        });
      }
      break;
  }

  return new Response(null, { status: 200 });
}
