


import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal'; // Import a modal component (you need to create this)
import { toast } from 'react-toastify';
import 'react-loading-skeleton/dist/skeleton.css'; // Import Skeleton CSS
const BaseUrl = import.meta.env.VITE_BASE_URL

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // State to handle the selected order
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BaseUrl}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        toast.error('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
        {orders.length === 0 ? (
          <p>You have no orders.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                onClick={() => handleOrderClick(order)}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Order ID: {order._id}</h3>
                  <p className="mb-2">Paid: {order.isPaid ? 'True' : 'False'}</p>
                  <p className="mb-2">Total Amount: ${order.totalAmount.toFixed(2)}</p>
                  <ul>
                    {order.products.slice(0, 2).map((item) => ( // Show only first 2 products
                      <li key={item.product._id}>
                        <p>{item.product.name} - Quantity: {item.quantity}</p>
                      </li>
                    ))}
                    {order.products.length > 2 && <li>+ {order.products.length - 2} more</li>}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Order Details */}
      {showModal && selectedOrder && (
        <Modal onClose={handleCloseModal}>
          <h3 className="text-2xl font-bold mb-4">Order ID: {selectedOrder._id}</h3>
          <p className="mb-2">Paid: {selectedOrder.isPaid ? 'True' : 'False'}</p>
          <p className="mb-2">Total Amount: ${selectedOrder.totalAmount.toFixed(2)}</p>
          <ul className="mb-4">
            {selectedOrder.products.map((item) => (
              <li key={item.product._id}>
                <p>{item.product.name} - Quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>
          <button onClick={handleCloseModal} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 transition-colors duration-300">
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Orders;
