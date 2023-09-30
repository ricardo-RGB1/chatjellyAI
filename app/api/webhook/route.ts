import Stripe from 'stripe';
import { headers } from "next/headers"; 
import { NextResponse } from "next/server";

import prismadb from '@/lib/prismadb';
import { stripe } from '@/lib/stripe';

   
export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body, 
            signature,
             process.env.STRIPE_WEBHOOK_SECRET! // guaranteed to be defined and not null or undefined.
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    // CHECKOUT SESSION -  Handle the checkout.session.completed event
    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === 'checkout.session.completed') {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        if (!session?.metadata?.userId){
            return new NextResponse('User id is required', { status: 400 })
        }

        await prismadb.userSubscription.create({ 
            data: {
                userId: session?.metadata?.userId,
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000 )
            }
        })
    }

    // Check if the user ugpraded their subscription
    if (event.type === 'invoice.payment_succeeded') {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );

        await prismadb.userSubscription.update({
            where: {
                stripeSubscriptionId: subscription.id
            },
            data: {
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000 
              ),
            }
        });
    }

    return new NextResponse(null, { status: 200});
}

// CHECKOUT SESSION -  Handle the checkout.session.completed event ************
// This section is a webhook endpoint that listens for the checkout.session.completed event from Stripe.

// When the event is received, the function retrieves the subscription information from Stripe using the stripe.subscriptions.retrieve function. It then creates a new record in the userSubscription table in a database using the prismadb library.

// The new record includes the userId from the metadata of the Stripe session, the stripeSubscriptionId, stripeCustomerId, stripePriceId, and stripeCurrentPeriodEnd from the retrieved subscription information.

// If the userId is not found in the metadata of the Stripe session, the function returns a 400 error response with the message "User id is required".

// This code is useful for handling the checkout.session.completed event from Stripe and updating the userSubscription table in a database with the subscription information. The code creates a new record in the userSubscription table for each new subscription.



// CHECK IF USER UPGRADED THEIR SUBSCRIPTION ************
// This code is a webhook endpoint that listens for the invoice.payment_succeeded event from Stripe.

// When the event is received, the function retrieves the subscription information from Stripe using the stripe.subscriptions.retrieve function. It then updates the userSubscription table in a database using the prismadb library.


// acct_1NvhLTJXr7JSwWKW stripe account