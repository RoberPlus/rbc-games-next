import { NextRequest, NextResponse } from 'next/server';
const stripe = require('stripe')(
  'sk_test_51QEbwTEAsCo6iA8ALDyhLSgnvurLBiKILKOGrfMVHtwT1x3rTgZp5bIH5CkFUDUOdLDBUlNWwbIYABCRjm6zNnMG00OJsaGTpD'
);

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Internal Error', error);
    return NextResponse.json({ error: `Internal Server Error: ${error}` }, { status: 500 });
  }
}
