import Stripe from "stripe";
import dotenv from "dotenv";
import { User } from "../Models/User.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripController = async (req, res) => {
  try {
    console.log("iam inside the stripe")    
    const { amount, userId } = req.body;
    console.log(userId);
    const session = await stripe.checkout.sessions.create({
      payment_intent_data: { metadata: { userId } },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Credits",
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: { userId },
      payment_method_options: {
        card: {
          request_three_d_secure: "any",
        },
      },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.log(error);
  }
};

//after successfull payment --> webhook is called to update the credits
// then stripe will get redirected to success page then after that we fetch the user info to update the redux with the upated userinfo
//strip only accepting the htts so installed ngrok and setup a alias url  https://9815-2401-4900-657b-f44d-558-ee24-1f1c-94d7.ngrok-free.app it will forward all the request to the http://localhost:5000
export const webhookController = async (req, res) => {
  const sign = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sign,
      process.env.WEBHOOK_SECRET_KEY
    );

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      const userId = paymentIntent.metadata?.userId;
      if (!userId) {
        return res.status(400).json({ error: "UserId is missing in metadata" });
      }
      await User.findByIdAndUpdate(userId, {
        $inc: { credits: paymentIntent.amount / 100 },
      });

      console.log("user credits as been increased");
    }
    res.json({ recieved: true });
  } catch (error) {
    console.log(error);
  }
};
