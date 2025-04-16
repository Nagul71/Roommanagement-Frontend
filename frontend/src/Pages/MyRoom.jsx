// src/pages/MyRooms.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import roomService from '../Services/roomService';
import ImageService from '../Services/ImageService';

const MyRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [img, setImg] = useState('');
  const navigate = useNavigate();
  const [roomImages, setRoomImages] = useState({});

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
          images[room.roomId] = imgRes.data[0]?.url || ''; // Adjust based on your API response
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





  if (loading) return <div className="text-center text-gray-600 mt-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Room Listings</h2>
        <button
          onClick={() => navigate('/create-room')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Room
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          {error}
        </div>
      )}

      {rooms.length === 0 ? (
        <div className="text-center bg-white p-10 rounded shadow">
          <p className="text-lg text-gray-700 mb-4">You haven't listed any rooms yet.</p>
          <button
            onClick={() => navigate('/create-room')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            List Your First Room
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map(room => (
            <div key={room.roomId} className="bg-white rounded shadow p-4 flex flex-col justify-between">
              <div className="bg-gray-200 h-40 flex items-center justify-center rounded mb-4">
              {roomImages[room.roomId] ? (
                <img
                src={roomImages[room.roomId]}
                alt="Room"
                className="w-full h-full object-cover rounded"
                />
                ) : (
                <div className="text-gray-500">No image available</div>
                )}

              </div>
              <div className="space-y-1 text-sm text-gray-800">
                <h3 className="text-lg font-semibold">{room.location}</h3>
                <p><strong>Size:</strong> {room.squareFeet} sq. ft.</p>
                <p><strong>Beds:</strong> {room.beds}</p>
                <p><strong>Type:</strong> {room.acOrNonAc}</p>
                <p><strong>Price:</strong> ${room.price.toFixed(2)}/month</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`font-medium ${room.status === 'Active' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {room.status}
                  </span>
                </p>
                <p>
                  <strong>Availability:</strong>{' '}
                  {room.available ? (
                    <span className="text-green-600 font-medium">Available</span>
                  ) : (
                    <span className="text-red-600 font-medium">Not Available</span>
                  )}
                </p>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  className="flex-1 border border-blue-600 text-blue-600 px-3 py-1 rounded hover:bg-blue-50 text-sm"
                  onClick={() => navigate(`/edit-room/${room.roomId}`)}
                >
                  Edit
                </button>
                <button
                  className="flex-1 border border-red-600 text-red-600 px-3 py-1 rounded hover:bg-red-50 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRooms;
