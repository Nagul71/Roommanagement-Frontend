// src/pages/RoomBrowser.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import roomService from '../Services/roomService';

const RoomBrowser = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    beds: '',
    acOrNonAc: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await roomService.getAllRooms();
        setRooms(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch rooms');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    return rooms.filter(room => {
      return (
        (filters.location === '' || 
         room.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (filters.minPrice === '' || room.price >= parseFloat(filters.minPrice)) &&
        (filters.maxPrice === '' || room.price <= parseFloat(filters.maxPrice)) &&
        (filters.beds === '' || room.beds >= parseInt(filters.beds)) &&
        (filters.acOrNonAc === '' || room.acOrNonAc === filters.acOrNonAc) 
        // room.available === true
      );
    });
  };

  const filteredRooms = applyFilters();

  if (loading) return <div className="text-center text-lg text-violet-500 mt-10">Loading rooms...</div>;
  if (error) return <div className="text-center text-lg text-red-500 mt-10">{error}</div>;

  return (
    <body class="bg-violet-50 min-h-screen">
    <div className="room-browser px-6 py-10 max-w-screen-xl mx-auto bg-violet-50">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-violet-900 mb-2">Find Your Perfect Room</h1>
        <p className="text-lg text-violet-700">Browse through available listings and book your ideal accommodation</p>
        
      </div>

      <div className="bg-white shadow-md rounded-2xl p-6 mb-10 border border-violet-200">
      <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 inline-flex items-center text-violet-600 hover:text-violet-800 font-medium transition duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Dashboard
        </button>
        <h2 className="text-2xl font-semibold text-violet-800 mb-4">Filter Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="flex flex-col gap-1">
            <label className="text-sm text-violet-700 font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="City, Area"
              className="border border-violet-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-violet-700 font-medium">Price Range</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Min"
                className="w-full border border-violet-300 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <span className="text-violet-500">to</span>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Max"
                className="w-full border border-violet-300 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-violet-700 font-medium">Beds</label>
            <select
              name="beds"
              value={filters.beds}
              onChange={handleFilterChange}
              className="border border-violet-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-violet-700 font-medium">Type</label>
            <select
              name="acOrNonAc"
              value={filters.acOrNonAc}
              onChange={handleFilterChange}
              className="border border-violet-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
            >
              <option value="">Any</option>
              <option value="AC">AC</option>
              <option value="NON_AC">Non-AC</option>
            </select>
          </div>
        </div>
      </div>

      <div className="results-section">
        <h2 className="text-xl font-semibold text-violet-800 mb-6">{filteredRooms.length} Rooms Available</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.length > 0 ? (
            filteredRooms.map(room => (
              <RoomCard 
                key={room.roomId} 
                room={room} 
                showBookButton={true}
                onBookClick={() => navigate(`/book-room/${room.roomId}`)}
              />
            ))
          ) : (
            <div className="text-center text-violet-500 col-span-full py-8">
              <p>No rooms match your filters. Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </body>
  );
};

export default RoomBrowser;