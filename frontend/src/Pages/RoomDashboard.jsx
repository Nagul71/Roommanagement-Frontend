import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import roomService from '../Services/roomService';
import RoomCard from '../components/RoomCard';

const RoomsDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          navigate('/login');
          return;
        }
        
        const response = await roomService.getRoomsCreatedByUser(userId);
        setRooms(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch rooms');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRooms();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-violet-50 to-purple-100">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-violet-600 animate-pulse"></div>
          <div className="w-4 h-4 rounded-full bg-violet-500 animate-pulse delay-75"></div>
          <div className="w-4 h-4 rounded-full bg-violet-400 animate-pulse delay-150"></div>
          <span className="text-violet-700 font-medium ml-2">Loading rooms...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-violet-50 to-purple-100">
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-500 max-w-md">
          <h3 className="text-lg font-semibold text-red-600 mb-2">Something went wrong</h3>
          <p className="text-gray-700">{error}</p>
          <button 
            onClick={() => navigate(-1)}
            className="mt-4 text-violet-600 hover:text-violet-800 font-medium transition duration-200"
          >
            &larr; Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-violet-50 to-purple-100 min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-violet-900 mb-4 sm:mb-0">Your Rooms</h1>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center px-4 py-2 border border-violet-300 text-violet-700 rounded-lg hover:bg-violet-50 transition"
              >
                &larr; Back
              </button>
              <button
                className="inline-flex items-center bg-violet-600 text-white px-5 py-2 rounded-lg shadow hover:bg-violet-700 transition"
                onClick={() => navigate('/addroom')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add New Room
              </button>
            </div>
          </div>
        </div>

        {/* Content section */}
        {rooms.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-10 text-center border border-violet-100">
            <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-violet-800 mb-2">No Rooms Yet</h2>
            <p className="text-gray-600 mb-6">You haven't listed any rooms for booking. Create your first listing!</p>
            <button
              className="bg-violet-600 text-white px-6 py-3 rounded-lg shadow hover:bg-violet-700 transition"
              onClick={() => navigate('/create-room')}
            >
              List Your First Room
            </button>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard key={room.roomId} room={room} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomsDashboard;