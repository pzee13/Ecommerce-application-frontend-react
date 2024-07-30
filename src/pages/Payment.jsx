// frontend/src/pages/Payment.js
import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


// eslint-disable-next-line no-undef
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// eslint-disable-next-line react/prop-types
const CheckoutForm = ({ orderId, totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      alert(error.message);
    } else {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          'http://localhost:5000/api/payment',
          { orderId, paymentMethodId: paymentMethod.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        toast.success(response.data.message);
        history('/orders');
      } catch (error) {
        toast.error('Payment failed');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay ${totalAmount}</button>
    </form>
  );
};

const Payment = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(response.data);
      } catch (error) {
        alert('Failed to fetch order');
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Payment for Order {orderId}</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm orderId={orderId} totalAmount={order.totalAmount} />
      </Elements>
    </div>
  );
};

export default Payment;
