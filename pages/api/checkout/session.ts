import { NextApiRequest, NextApiResponse } from "next"

// Stripe configuration
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { quantity } = req.body
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1HDgR4EePqX7QOuv2OAjjf7z", // $4.00 for Platypoose stickers defined in our Stripe Products catalog
        quantity,
      },
    ],
    mode: "payment",
    success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/checkout`,
  })
  res.status(200).json({ sessionId: session.id })
}
