/* eslint-disable react/no-unescaped-entities */



import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await axios.post('http://localhost:5000/api/users/login', { email, password });

      if (loginResponse.data.token) {
        toast.success(loginResponse.data.message);
        console.log("Token verified and saved");
        localStorage.setItem('token', loginResponse.data.token);
        navigate('/')
      } else {
        toast.error('Token verification failed');
      }
      
    } catch (error) {
      toast.error('Error: ' + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-black bg-opacity-75 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 rounded border border-gray-600 bg-gray-800 text-white placeholder-gray-400"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 rounded border border-gray-600 bg-gray-800 text-white placeholder-gray-400"
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center text-gray-400">
          <p> Haven't registered?  <Link to="/register" className="text-blue-400 hover:underline"> Register here </Link> </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
