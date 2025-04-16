// src/pages/RoomDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import roomService from '../Services/roomService';

const RoomDetail = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await roomService.getRoomDetails(roomId);
        setRoom(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch room details');
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  if (loading) return <div className="text-center text-violet-500 text-lg mt-10">Loading room details...</div>;
  if (error) return <div className="text-center text-red-500 text-lg mt-10">{error}</div>;
  if (!room) return <div className="text-center text-gray-500 text-lg mt-10">Room not found</div>;

  return (
    <div className="bg-violet-50 min-h-screen pb-10">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center text-violet-600 hover:text-violet-800 font-medium transition duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Dashboard
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-violet-900 mb-2 md:mb-0">{room.location}</h1>
          <span
            className={`inline-block px-4 py-1 text-sm rounded-full font-semibold ${
              room.available ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
            }`}
          >
            {room.available ? 'Available' : 'Booked'}
          </span>
        </div>

        {room.images?.length > 0 ? (
          <div className="mb-10">
            <div className="overflow-hidden rounded-2xl shadow-md border border-violet-200 bg-white mb-4">
              <img
                src={room.images[activeImage]?.imgUrl}
                alt={`Room ${activeImage + 1}`}
                className="w-full h-80 md:h-96 object-cover"
              />
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {room.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`overflow-hidden rounded-lg shadow-sm cursor-pointer ${
                    activeImage === index ? 'ring-2 ring-violet-500' : 'opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={image.imgUrl}
                    alt={`Room thumbnail ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-violet-500 bg-white p-10 rounded-xl shadow-md text-center mb-10 border border-violet-200">
            No images available
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-2xl p-6 border border-violet-200">
            <h3 className="text-xl font-semibold text-violet-800 mb-4">Room Details</h3>
            <ul className="text-violet-700 space-y-3">
              <li className="flex justify-between items-center pb-2 border-b border-violet-100">
                <span>Size</span>
                <span className="font-medium">{room.squareFeet} sq.ft</span>
              </li>
              <li className="flex justify-between items-center pb-2 border-b border-violet-100">
                <span>Beds</span>
                <span className="font-medium">{room.beds}</span>
              </li>
              <li className="flex justify-between items-center pb-2 border-b border-violet-100">
                <span>Type</span>
                <span className="font-medium">{room.acOrNonAc === 'AC' ? 'Air Conditioned' : 'Non-AC'}</span>
              </li>
              <li className="flex justify-between items-center pb-2 border-b border-violet-100">
                <span>Price</span>
                <span className="font-medium text-violet-900">₹{room.price}/month</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Status</span>
                <span className="font-medium">{room.status}</span>
              </li>
            </ul>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 border border-violet-200">
            <h3 className="text-xl font-semibold text-violet-800 mb-4">Description</h3>
            <p className="text-violet-700 leading-relaxed">
              Beautiful room located in {room.location}. {room.acOrNonAc === 'AC' ? 'Air conditioned' : 'Non air conditioned'} with {room.beds} comfortable bed{room.beds > 1 ? 's' : ''}.
            </p>
            
            <div className="mt-6 pt-6 border-t border-violet-100">
              <button
                onClick={() => navigate(`/book-room/${room.roomId}`)}
                className="w-full bg-violet-600 text-white py-3 px-4 rounded-xl shadow-md hover:bg-violet-700 transition duration-200 font-medium flex items-center justify-center"
                disabled={room.available}
              >
                {!room.available ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Book This Room
                  </>
                ) : (
                  'Currently Booked'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;