import Stripe from 'stripe';
import {headers} from 'next/headers'
import {NextResponse} from 'next/server'
import { stripe } from '@/lib/stripe';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  const body = await req.text(); //text vs josn,la diferencia es que text es un string y json es un objeto
  const siganture = headers().get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, siganture, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error) {
     return new NextResponse("Webhook Error", {status: 400});
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if(event.type === 'checkout.session.completed'){
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        if(!session?.metadata?.userId){
            return new NextResponse("User id is required", {status: 400});
        }

        await prismadb.userSubscription.create({
            data: {
                stripeCustomerId: subscription.customer as string,
                stripeSubscriptionId: subscription.id as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                userId: session?.metadata?.userId
            }
        });
  }


  if(event.type === 'invoice.payment_succeeded'){
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
    await prismadb.userSubscription.update({
        where: {
            stripeSubscriptionId: subscription.id
        },
        data: {
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            stripePriceId: subscription.items.data[0].price.id
        }
    });
  }




  return new NextResponse("Webhook Received", {status: 200});
}