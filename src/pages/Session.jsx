
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Skeleton from 'react-loading-skeleton'; 
import 'react-loading-skeleton/dist/skeleton.css'; 
const BaseUrl = import.meta.env.VITE_BASE_URL

const SessionList = () => {
  const [sessions, setSessions] = useState([]);  // State to hold sessions
  const [loading, setLoading] = useState(true);  // State for loading
  const [error, setError] = useState(null);      // State for errors

  useEffect(() => {

    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get(`${BaseUrl}/api/users/sessions`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        setSessions(response.data); 
        setLoading(false); 
      } catch (error) {
        setError(error.response?.data?.error || 'Failed to fetch sessions'); 
        setLoading(false); 
      }
    };

    fetchSessions();
  }, []); 

  if (loading) {
    return (
      <>
      <Navbar />
      <div className='bg-black mt-[-40px]'>
      <div className="bg-black text-white p-4 rounded shadow-lg max-w-4xl mx-auto my-8">
        <h2 className="text-2xl font-bold text-center mb-4">User Sessions</h2>
        <div className="space-y-4">
          <Skeleton height={40} count={5} />
        </div>
      </div>
      </div>
      </>
    );
  }

  // If error exists, show error message
  if (error) {
    return <div className="text-center text-red-600 p-4">{error}</div>;
  }

  // Render sessions in a table
  return (
    <>
      <Navbar />
      <div className='bg-black mt-[-40px]'>
        <div className="max-w-4xl mx-auto my-8 p-4 bg-gray-800 text-white rounded-lg shadow-lg bg-opacity-70">
          <h2 className="text-2xl font-bold text-center mb-4">User Sessions</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 p-2 text-left">Session ID</th>
                <th className="border-b-2 p-2 text-left">Login Time</th>
                <th className="border-b-2 p-2 text-left">Logout Time</th>
                <th className="border-b-2 p-2 text-left">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session._id}>
                  <td className="border-b p-2">{session._id}</td>
                  <td className="border-b p-2">{new Date(session.loginTime).toLocaleString()}</td>
                  <td className="border-b p-2">{session.logoutTime ? new Date(session.logoutTime).toLocaleString() : 'N/A'}</td>
                  <td className="border-b p-2">{session.ipAddress || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SessionList;
