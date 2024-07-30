


import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { loadStripe } from "@stripe/stripe-js";
import Navbar from '../components/Navbar';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setCart(response.data.items);
        setTotalAmount(response.data.totalAmount);
      } else {
        toast.error(response.data.error || 'Failed to fetch cart');
      }
    } catch (error) {
      console.error('Fetch Cart Error:', error);
      toast.error('An error occurred while fetching cart data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, newQuantity, index) => {
    if (newQuantity < 1) {
      toast.error('Quantity must be at least 1');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        'http://localhost:5000/api/cart/update',
        { productId, quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setCart(prevCart => {
          const newCart = [...prevCart];
          newCart[index].quantity = newQuantity;
          return newCart;
        });
        setTotalAmount(response.data.totalAmount);
        toast.success('Cart updated successfully');
      } else {
        toast.error(response.data.error || 'Failed to update cart');
      }
    } catch (error) {
      console.error('Update Cart Error:', error);
      toast.error('An error occurred while updating cart data');
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        'http://localhost:5000/api/cart/remove',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        fetchCart(); // Refresh cart data
        toast.success(response.data);
      } else {
        toast.error(response.data.error || 'Failed to remove product');
      }
    } catch (error) {
      console.error('Remove Item Error:', error);
      toast.error('An error occurred while removing the product');
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/orders',
        { products: cart, totalAmount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        const { id } = response.data;
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: id });
      } else {
        toast.error(response.data.error || 'Failed to place order');
      }
    } catch (error) {
      console.error('Place Order Error:', error);
      toast.error('An error occurred while placing the order');
    }
  };

  return (
    <div className='h-screen bg-black text-white'>
      <Navbar />
      <div className="container mx-auto px-4 py-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
        {loading ? (
          <Skeleton count={5} height={40} className="mb-4" />
        ) : cart.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <>
            <table className="w-full table-auto bg-gray-700 rounded-lg">
              <thead>
                <tr className="bg-gray-600">
                  <th className="py-3 px-4 text-left">Product</th>
                  <th className="py-3 px-4 text-center">Quantity</th>
                  <th className="py-3 px-4 text-right">Price</th>
                  <th className="py-3 px-4 text-right">Total</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={item.product?._id || Math.random()}>
                    <td className="py-3 px-4">{item.product?.name || 'Unknown Product'}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleQuantityChange(item.product?._id, item.quantity - 1, index)}
                          className="px-3 py-1 bg-gray-600 text-white rounded-l hover:bg-gray-500"
                        >
                          -
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.product?._id, item.quantity + 1, index)}
                          className="px-3 py-1 bg-gray-600 text-white rounded-r hover:bg-gray-500"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">${(item.product?.price || 0).toFixed(2)}</td>
                    <td className="py-3 px-4 text-right">${(item.product?.price * item.quantity || 0).toFixed(2)}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleRemoveItem(item.product?._id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 flex justify-between items-center bg-gray-700 p-4 rounded-lg">
              <h3 className="text-xl font-semibold">Total Amount: ${totalAmount.toFixed(2)}</h3>
              <button
                onClick={handlePlaceOrder}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
