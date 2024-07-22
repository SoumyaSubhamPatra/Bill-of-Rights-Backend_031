import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// PayPal client ID from your PayPal Developer Dashboard
const PAYPAL_CLIENT_ID = 'your-paypal-client-id';

interface PayPalPaymentProps {
  amount: number;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
}

const PayPalPayment: React.FC<PayPalPaymentProps> = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toFixed(2)
                }
              }
            ]
          });
        }}
        onApprove={async (data, actions) => {
          await actions.order.capture();
          onSuccess(data);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;
