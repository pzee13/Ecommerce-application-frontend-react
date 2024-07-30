import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Products from './pages/Product';
import Cart from './pages/Cart';
import Orders from './pages/Order';
import Payment from './pages/Payment';
import Admin from './pages/Admin';
import SessionList from "./pages/Session"
import ErrorBoundary from './ErrorBoundary';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <ErrorBoundary>
      <ToastContainer autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/session" element={<SessionList />} />
      </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
