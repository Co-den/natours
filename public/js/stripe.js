/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";
import { loadStripe } from "@stripe/stripe-js";

// Function to book a tour
export const bookTour = async (tourId) => {
  try {
    const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY);

    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Redirect to Stripe checkout
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert("error", err.message || "Something went wrong!");
  }
};

