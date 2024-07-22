import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Make sure to replace with your Stripe publishable key
const stripePromise = loadStripe('your-publishable-key-here');

interface StripePaymentProps {
  amount: number;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: any) => void;
}

const CheckoutForm: React.FC<StripePaymentProps> = ({ amount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      const { paymentIntent, error } = await stripe.createPayment({
        amount,
        currency: 'usd',
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        onError(error);
        setError(error.message);
      } else {
        onSuccess(paymentIntent);
      }
    } catch (error) {
      onError(error);
      setError(error.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div>{error}</div>}
      <button type="submit" disabled={!stripe || processing}>
        {processing ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

const StripePayment: React.FC<StripePaymentProps> = (props) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm {...props} />
  </Elements>
);

export default StripePayment;
