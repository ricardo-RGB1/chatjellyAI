import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";


// The absolute URL of the settings page
const settingsUrl = absoluteUrl("/settings");

// 
export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    // if the user is not logged in, return a 401 error
    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // find the current user's subscription in the database
    const userSubscription = await prismadb.userSubscription.findUnique({
      where: { userId },
    });

    // if the user has a Stripe customer ID, create a Stripe portal session and return the URL to the client so they can be redirected to the settings page
    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    // Create a Stripe session if the user doesn't have a Stripe customer ID (subscription)
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "chatJelly Pro",
              description: "Unlimited AI Generated Messages",
            },
            unit_amount: 1000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    // return the Stripe session URL to the client so they can be redirected to the checkout page
    return new NextResponse(JSON.stringify({ url: stripeSession.url }));

  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


// The async GET function first checks if the user is authenticated and retrieves the current user's information. It then checks if the user has an active subscription by querying the userSubscription table in a database.

// If the user has an active subscription, the function creates a Stripe portal session and returns the URL to the client so they can be redirected to the settings page. If the user does not have an active subscription, the function creates a Stripe checkout session and returns the URL to the client so they can be redirected to the checkout page.

// The function returns a JSON response with the URL of the Stripe session or portal session, depending on the user's subscription status. If there is an error during the process, the function returns a 500 error response.