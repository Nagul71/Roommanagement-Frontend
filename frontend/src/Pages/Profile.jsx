import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaHome, FaBed, FaSnowflake, FaRupeeSign, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const ProfilePage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeRoomTab, setActiveRoomTab] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/auth/user/${userId}`);
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-violet-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md mx-auto mt-8 rounded-lg shadow-sm">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="bg-violet-100 border-l-4 border-violet-500 text-violet-800 p-4 max-w-md mx-auto mt-8 rounded-lg shadow-sm">
        <p className="font-bold">No Data</p>
        <p>No user data found for this ID</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-violet-50">

        
      {/* User Profile Header */}
      <div className="bg-gradient-to-r  from-violet-700 to-purple-600 py-12 px-4 sm:px-6 lg:px-8 text-white shadow-lg">
        
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center mb-6 md:mb-0 md:mr-8 shadow-md">
              <FaUser className="text-violet-600 text-6xl" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{userData.name}</h1>
              <p className="text-xl opacity-90 mb-4">{userData.profileInfo}</p>
              <div className="flex flex-wrap gap-4">
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full flex items-center shadow-sm">
                  <FaEnvelope className="mr-2 text-violet-500" /> 
                  <span className="text-violet-800">{userData.email}</span>
                </span>
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full flex items-center shadow-sm">
                  <FaPhone className="mr-2 text-violet-500" /> 
                  <span className="text-violet-800">{userData.mobileNo}</span>
                </span>
                <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full flex items-center shadow-sm">
                  <FaCalendarAlt className="mr-2 text-violet-500" /> 
                  <span className="text-violet-800">Member since {new Date(userData.timestamp).toLocaleDateString()}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 inline-flex items-center text-violet-600 hover:text-violet-800 font-medium transition duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        {/* Rooms Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-violet-100">
          <div className="p-6 border-b border-violet-100">
            <h2 className="text-2xl font-bold text-violet-800 flex items-center">
              <FaHome className="mr-3 text-violet-600" /> My Rooms ({userData.rooms.length})
            </h2>
          </div>

          {/* Room Tabs */}
          <div className="border-b border-violet-100">
            <nav className="flex overflow-x-auto">
              {userData.rooms.map((room, index) => (
                <button
                  key={room.roomId}
                  onClick={() => setActiveRoomTab(index)}
                  className={`px-6 py-3 font-medium text-sm focus:outline-none whitespace-nowrap transition-colors ${
                    activeRoomTab === index
                      ? 'border-b-2 border-violet-600 text-violet-700 bg-violet-50'
                      : 'text-violet-500 hover:text-violet-700 hover:bg-violet-50'
                  }`}
                >
                  {room.location.trim() || 'Unnamed Location'}
                </button>
              ))}
            </nav>
          </div>

          {/* Active Room Content */}
          {userData.rooms.length > 0 && (
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Room Images Carousel */}
                <div className="lg:w-2/3">
                  <div className="relative rounded-xl overflow-hidden bg-violet-50 shadow-inner" style={{ paddingBottom: '56.25%' }}>
                    {userData.rooms[activeRoomTab].images.length > 0 ? (
                      <img
                        src={userData.rooms[activeRoomTab].images[0].imgUrl}
                        alt="Room"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-violet-300">
                        <FaHome className="text-4xl" />
                      </div>
                    )}
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {userData.rooms[activeRoomTab].images.slice(0, 6).map((image) => (
                      <div key={image.imgId} className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                        <img
                          src={image.imgUrl}
                          alt="Room"
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Room Details */}
                <div className="lg:w-1/3">
                  <h3 className="text-2xl font-bold text-violet-800 mb-2">
                    {userData.rooms[activeRoomTab].location.trim() || 'Unnamed Location'}
                  </h3>
                  <div className="flex items-center text-violet-600 mb-4">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{userData.rooms[activeRoomTab].location.trim() || 'Location not specified'}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-violet-50 p-3 rounded-lg border border-violet-100">
                      <div className="text-violet-500 text-xs uppercase font-medium">Size</div>
                      <div className="font-semibold text-violet-800">{userData.rooms[activeRoomTab].squareFeet} sq.ft</div>
                    </div>
                    <div className="bg-violet-50 p-3 rounded-lg border border-violet-100">
                      <div className="text-violet-500 text-xs uppercase font-medium">Beds</div>
                      <div className="font-semibold text-violet-800 flex items-center">
                        <FaBed className="mr-2" /> {userData.rooms[activeRoomTab].beds}
                      </div>
                    </div>
                    <div className="bg-violet-50 p-3 rounded-lg border border-violet-100">
                      <div className="text-violet-500 text-xs uppercase font-medium">Type</div>
                      <div className="font-semibold text-violet-800 flex items-center">
                        <FaSnowflake className="mr-2" /> {userData.rooms[activeRoomTab].acOrNonAc}
                      </div>
                    </div>
                    <div className="bg-violet-50 p-3 rounded-lg border border-violet-100">
                      <div className="text-violet-500 text-xs uppercase font-medium">Price</div>
                      <div className="font-semibold text-violet-800 flex items-center">
                        <FaRupeeSign className="mr-2" /> {userData.rooms[activeRoomTab].price}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-violet-700 mb-2">Status</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      userData.rooms[activeRoomTab].status === 'AVAILABLE'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {userData.rooms[activeRoomTab].status || 'STATUS NOT SET'}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-violet-700 mb-2">Listed On</h4>
                    <p className="text-violet-600">
                      {new Date(userData.rooms[activeRoomTab].timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* All Rooms Grid View */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-violet-800 mb-6">All Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userData.rooms.map((room) => (
              <div key={room.roomId} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-violet-100 hover:border-violet-200">
                {room.images.length > 0 ? (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={room.images[0].imgUrl}
                      alt="Room"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-violet-50 flex items-center justify-center text-violet-300">
                    <FaHome className="text-4xl" />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 text-violet-800">{room.location.trim() || 'Unnamed Location'}</h3>
                  <div className="flex justify-between text-sm text-violet-600 mb-2">
                    <span>{room.squareFeet} sq.ft</span>
                    <span>{room.beds} {room.beds === 1 ? 'bed' : 'beds'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-violet-700 flex items-center">
                      <FaRupeeSign className="mr-1" /> {room.price}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      room.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' : 'bg-violet-100 text-violet-800'
                    }`}>
                      {room.status || 'Not specified'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;