import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createSubscription } from './api'; // This is a placeholder for the function to communicate with your backend

export default function CheckoutForm() {
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
    } else {
      const subscription = await createSubscription(paymentMethod.id); // Send paymentMethod.id to your backend
      if (subscription.error) {
        setError(subscription.error.message);
      } else {
        // Save subscription info in your database and proceed
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Subscribe
      </button>
      {error && <div>{error}</div>}
    </form>
  );
}