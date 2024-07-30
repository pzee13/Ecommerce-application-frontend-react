

import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

Modal.setAppElement('#root'); // Adjust as necessary for your app's root element

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [editProductId, setEditProductId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        toast.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const openModal = (product = null) => {
    if (product) {
      setName(product.name || '');
      setDescription(product.description || '');
      setPrice(product.price || '');
      setStock(product.stock || '');
      setEditProductId(product._id || null);
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      setEditProductId(null);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const addOrUpdateProduct = async () => {
    if (!name || !description || !price || !stock) {
      toast.error('All fields are required!');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      let response;

      if (editProductId) {
        // Update existing product
        response = await axios.put(
          `http://localhost:5000/api/products/${editProductId}`,
          { name, description, price, stock },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('Update response:', response.data);
        toast.success('Product updated successfully!');
      } else {
        // Add new product
        response = await axios.post(
          'http://localhost:5000/api/products',
          { name, description, price, stock },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('Add response:', response.data);
        toast.success('Product added successfully!');
      }

      // Refetch products to ensure state consistency
      const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/products');
          if (Array.isArray(response.data)) {
            setProducts(response.data);
          } else {
            console.error('Unexpected response format:', response.data);
          }
        } catch (error) {
          console.error('Failed to fetch products:', error);
          toast.error('Failed to fetch products');
        }
      };

      fetchProducts();
      closeModal(); // Close the modal after submission
    } catch (error) {
      console.error('Failed to add/update product:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        toast.error(error.response.data.error || 'Failed to add/update product');
      } else {
        toast.error('Failed to add/update product');
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:5000/api/products/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message);

      // Remove deleted product from the products list
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
    } catch (error) {
      console.error('Failed to delete product:', error);
      toast.error(error.response?.data?.error || 'Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-black text-gray-200 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Admin Panel</h2>

      <button
        onClick={() => openModal()}
        className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 mb-6"
      >
        Add Product
      </button>

      {loading && <p className="text-center text-gray-400">Loading...</p>}

      <h3 className="text-2xl mb-4">Products</h3>
      <ul className="space-y-4">
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product._id} className="bg-gray-700 p-4 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold mb-2">{product.name || 'No name'}</h4>
              <p className="mb-2">{product.description || 'No description'}</p>
              <p className="mb-2">Price: ${product.price || '0.00'}</p>
              <p className="mb-4">Stock: {product.stock || '0'}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => openModal(product)}
                  disabled={loading}
                  className="py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(product._id)}
                  disabled={loading}
                  className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-400">No products available</p>
        )}
      </ul>

      {/* Modal for adding/editing products */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Product Modal"
        className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-75"
      >
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-2xl mb-4">{editProductId ? 'Edit Product' : 'Add Product'}</h3>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className="w-full p-2 mb-4 border rounded-lg bg-gray-700 text-gray-200"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            className="w-full p-2 mb-4 border rounded-lg bg-gray-700 text-gray-200"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={loading}
            className="w-full p-2 mb-4 border rounded-lg bg-gray-700 text-gray-200"
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            disabled={loading}
            className="w-full p-2 mb-4 border rounded-lg bg-gray-700 text-gray-200"
          />
          <div className="flex justify-end space-x-4">
            <button
              onClick={addOrUpdateProduct}
              disabled={loading}
              className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              {editProductId ? 'Update Product' : 'Add Product'}
            </button>
            <button
              onClick={closeModal}
              className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Admin;
