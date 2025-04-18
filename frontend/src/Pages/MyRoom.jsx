// src/pages/MyRooms.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import roomService from '../Services/roomService';
import ImageService from '../Services/ImageService';

const MyRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [roomImages, setRoomImages] = useState({});
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Fetch images after fetching rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await roomService.getRoomsCreatedByUser();
        setRooms(response.data);

        // Fetch images for each room
        const images = {};
        for (const room of response.data) {
          try {
            const imgRes = await ImageService.getRoomImages(room.roomId);
            images[room.roomId] = imgRes.data[0]?.imgUrl || '';
          } catch (imgErr) {
            console.error(`Error fetching image for room ${room.roomId}:`, imgErr);
            images[room.roomId] = '';
          }
        }
        setRoomImages(images);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch rooms');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleDelete = (roomId) => {
    // Show confirmation modal
    setDeleteConfirm(roomId);
  };

  const confirmDelete = async (roomId) => {
    try {
      // Implement the actual delete functionality
      // await roomService.deleteRoom(roomId);
      
      // Remove from UI without needing to refetch
      setRooms(rooms.filter(room => room.roomId !== roomId));
      setDeleteConfirm(null);
    } catch (err) {
      setError('Failed to delete room. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b pb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">My Room Listings</h2>
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center text-violet-600 hover:text-violet-800 font-medium transition duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Dashboard
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow animate-fade-in">
          <div className="flex items-center">
            <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </div>
        </div>
      )}

      {rooms.length === 0 ? (
        <div className="text-center bg-white p-12 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <p className="text-xl text-gray-700 mb-6">You haven't listed any rooms yet.</p>
          <button
            onClick={() => navigate('/create-room')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            List Your First Room
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map(room => (
            <div key={room.roomId} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                {roomImages[room.roomId] ? (
                  <img
                    src={roomImages[room.roomId]}
                    alt={`Room in ${room.location}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                {/* <div className="absolute top-0 right-0 m-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${room.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {room.available ? 'Available' : 'Not Available'}
                  </span>
                </div> */}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{room.location}</h3>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 text-sm text-gray-700">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>{room.squareFeet} sq. ft.</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>{room.beds} Beds</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>{room.acOrNonAc}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="font-medium text-gray-900">${room.price.toFixed(2)}/month</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  {/* <div className="flex justify-between mb-4">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className={`text-sm font-medium ${room.status === 'Active' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {room.status}
                    </span>
                  </div> */}
                  
                  <div className="flex gap-3">
                    <button
                      className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors duration-300 text-sm font-medium flex items-center justify-center"
                      onClick={() => navigate(`/edit-room/${room.roomId}`)}
                    >
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      className="flex-1 border border-red-600 text-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition-colors duration-300 text-sm font-medium flex items-center justify-center"
                      onClick={() => handleDelete(room.roomId)}
                    >
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 animate-fade-in">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this room? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={() => confirmDelete(deleteConfirm)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add some custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default MyRooms;