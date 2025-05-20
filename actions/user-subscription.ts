"use server";

import { auth, currentUser } from "@clerk/nextjs/server";

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { getUserSubscription } from "@/db/queries";

const returnUrl = absoluteUrl("/shop"); // http://localhost:3000/shop for now

export const createStripeUrl = async () => {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        throw new Error("Unauthorized");
    }

    const userSubscription = await getUserSubscription();

    if (userSubscription && userSubscription.stripeCustomerId) {
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: userSubscription.stripeCustomerId,
            return_url: returnUrl,
        });

        return { data: stripeSession.url };
    };

    const stripeSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"], // Add whatever you want here (with the autocomplete)
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: "Nami Pro",
                        description: "Unlimited Gems", // Change later once you add more pro benefits 
                    },
                    unit_amount: 500, // $5 USD // $5.00 // 500 cents // OHHHH bc yen and won don't have cents so you write it like this OHHHHHHHHHHHH
                    recurring: {
                        interval: "month",
                    },
                },
            },
        ],
        metadata: { // NEVER DELETE YOU NEED THIS FOR WEBHOOKS TO KNOW WHICH USER because payments can take time
            userId,
        },
        success_url: returnUrl,
        cancel_url: returnUrl,
    });

    return { data: stripeSession.url };
};
