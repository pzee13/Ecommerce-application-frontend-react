
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        toast.error('Failed to fetch products');
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/cart',
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.message) {
        toast.success(response.data.message);

        const cartItems = response.data.items.map(
          (item) =>
            `Product: ${item.product.name}, Price: $${item.product.price}, Quantity: ${item.quantity}`
        ).join('\n');

        toast.success(cartItems);
      } else {
        toast.success('Product added to cart successfully');
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Failed to add product to cart');
      }
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h2 className="text-3xl font-bold text-white mb-6">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden flex flex-col"
            >
              <div className="flex-grow p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-300 mb-2 line-clamp-2">{product.description}</p>
                <p className="text-lg font-semibold mb-2">Price: ${product.price}</p>
                <p className="text-gray-400">Stock: {product.stock}</p>
              </div>
              <div className="p-4 bg-gray-700">
                <button
                  onClick={() => addToCart(product._id)}
                  className="w-full py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors duration-300"
                >
                  Add to Cart
                </button>
              </div>
              <button
                onClick={() => openModal(product)}
                className="p-2 bg-gray-600 text-white rounded-b-lg w-full text-center hover:bg-gray-500 transition-colors duration-300"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center text-center justify-center z-50">
          <div className="bg-white bg-opacity-70 text-gray-900 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4">{selectedProduct.name}</h3>
              <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
              <p className="text-lg font-semibold mb-4">Price: ${selectedProduct.price}</p>
              <p className="text-gray-600 mb-4">Stock: {selectedProduct.stock}</p>
              <button
                onClick={() => addToCart(selectedProduct._id)}
                className="w-full py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
