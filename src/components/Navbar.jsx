// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Toggle the mobile menu
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <header className=" text-gray-400 border-b border-gray-200 bg-[#2F2F2F] shadow-2xl">
//       <div className="container mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
//         {/* Logo Section */}
//         <div className="flex-shrink-0">
//             <h1 className='ml-10 text-3xl font-bold'>ProductHub</h1>
          
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           type="button"
//           className="lg:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           onClick={toggleMobileMenu}
//         >
//           {/* Hamburger Icon */}
//           <svg
//             className={`h-6 w-6 text-gray-400 transition-transform duration-300 ${
//               isMobileMenuOpen ? 'transform rotate-180' : ''
//             }`}
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 8h16M4 16h16'}
//             />
//           </svg>
//         </button>

//         {/* Navigation Links */}
//         <div
//           className={`${
//             isMobileMenuOpen ? 'block' : 'hidden'
//           } lg:flex lg:items-center lg:ml-auto lg:space-x-10`}
//         >
//           <Link
//             className="block py-2 px-4 text-gray-400 hover:text-white  transition-colors duration-300 lg:p-0"
//             to="/products"
//           >
//             Products
//           </Link>
//           <Link
//             className="block py-2 px-4 text-gray-400 hover:text-white  transition-colors duration-300 lg:p-0"
//             to="/cart"
//           >
//             Cart
//           </Link>
//           <Link
//             className="block py-2 px-4 text-gray-400 hover:text-white  transition-colors duration-300 lg:p-0"
//             to="/session"
//           >
//             Session
//           </Link>
//           <Link
//             className="block py-2 px-4 text-gray-400 hover:text-white  transition-colors duration-300 lg:p-0"
//             to="/orders"
//           >
//             Orders
//           </Link>
//           <Link
//             to="/login"
//             className="block py-5 px-5 text-gray-400 bg-gray-200 bg-opacity-20 rounded-lg shadow hover:text-white  hover:bg-gray-200 hover:bg-opacity-30 transition-colors duration-300 lg:p-2 lg:ml-6 lg:rounded-md"
//             >
//             Login
//             </Link>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


import { useState, useEffect } from 'react';
import { Link, useLocation ,useNavigate } from 'react-router-dom';
import axios from 'axios';

const BaseUrl = import.meta.env.VITE_BASE_URL

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [location]);

  // Toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle logout
  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Call the API to logout
        await axios.post(`${BaseUrl}/api/users/logout`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Clear the local storage and update UI
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/') // Redirect to login page
      } catch (error) {
        console.error('Logout error:', error);
        alert('Error logging out');
      }
    } else {
      alert('No token found, unable to logout');
    }
  };

  return (
    <header className="text-gray-400 border-b border-gray-200 bg-black shadow-2xl">
      <div className="container mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <h1 className="ml-10 text-3xl font-bold">ProductHub</h1>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={toggleMobileMenu}
        >
          {/* Hamburger Icon */}
          <svg
            className={`h-6 w-6 text-gray-400 transition-transform duration-300 ${
              isMobileMenuOpen ? 'transform rotate-180' : ''
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 8h16M4 16h16'}
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } lg:flex lg:items-center lg:ml-auto lg:space-x-10`}
        >
            <Link
            className="block py-2 px-4 text-gray-400 hover:text-white transition-colors duration-300 lg:p-0"
            to="/"
          >
            Home
          </Link>
          <Link
            className="block py-2 px-4 text-gray-400 hover:text-white transition-colors duration-300 lg:p-0"
            to="/products"
          >
            Products
          </Link>
          <Link
            className="block py-2 px-4 text-gray-400 hover:text-white transition-colors duration-300 lg:p-0"
            to="/cart"
          >
            Cart
          </Link>
          <Link
            className="block py-2 px-4 text-gray-400 hover:text-white transition-colors duration-300 lg:p-0"
            to="/session"
          >
            Session
          </Link>
          <Link
            className="block py-2 px-4 text-gray-400 hover:text-white transition-colors duration-300 lg:p-0"
            to="/orders"
          >
            Orders
          </Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="block py-2 px-4 text-gray-400 bg-gray-200 bg-opacity-20 rounded-lg shadow hover:text-white hover:bg-gray-200 hover:bg-opacity-30 transition-colors duration-300 lg:p-2 lg:ml-6 lg:rounded-md"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block py-2 px-4 text-gray-400 bg-gray-200 bg-opacity-20 rounded-lg shadow hover:text-white hover:bg-gray-200 hover:bg-opacity-30 transition-colors duration-300 lg:p-2 lg:ml-6 lg:rounded-md"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
