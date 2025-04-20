import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import roomService from '../Services/roomService';
import ImageService from '../Services/ImageService';
import { FaHome, FaBed, FaSnowflake, FaRupeeSign, FaMapMarkerAlt, FaEdit, FaTrash, FaArrowLeft, FaExclamationTriangle, FaImage } from 'react-icons/fa';

const MyRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [roomImages, setRoomImages] = useState({});
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await roomService.getRoomsCreatedByUser();
        setRooms(response.data);

        const images = {};
        await Promise.all(
          response.data.map(async (room) => {
            try {
              const imgRes = await ImageService.getRoomImages(room.roomId);
              images[room.roomId] = imgRes.data[0]?.imgUrl || '';
            } catch (imgErr) {
              console.error(`Error fetching image for room ${room.roomId}:`, imgErr);
              images[room.roomId] = '';
            }
          })
        );
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
    setDeleteConfirm(roomId);
  };

  const confirmDelete = async (roomId) => {
    try {
      await roomService.getdeletebyid(roomId);
      setRooms(rooms.filter(room => room.roomId !== roomId));
      setDeleteConfirm(null);
    } catch (err) {
      setError('Failed to delete room. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-violet-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-violet-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-violet-700 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Room Listings</h1>
              <p className="text-violet-100 opacity-90">
                {rooms.length} {rooms.length === 1 ? 'room' : 'rooms'} listed
              </p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="mt-4 md:mt-0 flex items-center text-violet-100 hover:text-white transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <FaExclamationTriangle className="text-red-500 mr-3" />
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {rooms.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center max-w-2xl mx-auto transform transition-all hover:shadow-lg">
            <div className="bg-violet-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaHome className="text-violet-600 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No Rooms Listed Yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't listed any rooms yet. Start by creating your first listing to attract potential renters.
            </p>
            <button
              onClick={() => navigate('/create-room')}
              className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              List Your First Room
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map(room => (
              <div 
                key={room.roomId} 
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-violet-100"
              >
                {/* Room Image */}
                <div className="relative h-56 overflow-hidden">
                  {roomImages[room.roomId] ? (
                    <img
                      src={roomImages[room.roomId]}
                      alt={`Room in ${room.location}`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-violet-50 flex flex-col items-center justify-center text-violet-400">
                      <FaImage className="text-4xl mb-2" />
                      <span className="text-sm">No Image Available</span>
                    </div>
                  )}
                </div>
                
                {/* Room Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center">
                      <FaMapMarkerAlt className="text-violet-600 mr-2" />
                      {room.location}
                    </h3>
                    <span className="bg-violet-100 text-violet-800 text-xs px-2 py-1 rounded-full">
                      {room.acOrNonAc}
                    </span>
                  </div>

                  {/* Room Specs */}
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="flex items-center">
                      <div className="bg-violet-100 p-2 rounded-full mr-3">
                        <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Size</p>
                        <p className="font-medium">{room.squareFeet} sq.ft</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-violet-100 p-2 rounded-full mr-3">
                        <FaBed className="text-violet-600 text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Beds</p>
                        <p className="font-medium">{room.beds}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-violet-100 p-2 rounded-full mr-3">
                        <FaSnowflake className="text-violet-600 text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Type</p>
                        <p className="font-medium">{room.acOrNonAc}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-violet-100 p-2 rounded-full mr-3">
                        <FaRupeeSign className="text-violet-600 text-sm" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="font-medium">₹{room.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 border-t border-violet-100 pt-4">
                    <button
                      onClick={() => navigate(`/edit-room/${room.roomId}`)}
                      className="flex-1 flex items-center justify-center bg-white text-violet-600 border border-violet-600 hover:bg-violet-50 px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(room.roomId)}
                      className="flex-1 flex items-center justify-center bg-white text-red-600 border border-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      <FaTrash className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 z-50 flex items-center justify-center p-4 ">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <FaExclamationTriangle className="text-red-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Confirm Deletion</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this room listing? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmDelete(deleteConfirm)}
                  className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Room
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRooms;