// src/components/RoomCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoomCard = ({ room, showBookButton = false, onBookClick }) => {
  const navigate = useNavigate();

  const mainImage = room.images?.length > 0
    ? room.images[0].imgUrl
    : 'https://via.placeholder.com/300x200?text=No+Image';

  const handleCardClick = () => {
    navigate(`/rooms/${room.roomId}`);
  };

  const handleViewDetailsClick = (e) => {
    e.stopPropagation();
    navigate(`/rooms/${room.roomId}`);
  };

  // Format price with commas
  const formattedPrice = room.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  return (
    <div 
      className="room-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-violet-200 cursor-pointer" 
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative h-52 overflow-hidden group">
        <img 
          src={mainImage} 
          alt={`Room in ${room.location}`} 
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className={`absolute top-3 left-3 py-1 px-3 rounded-md text-xs font-semibold shadow-sm ${room.available ? 'bg-violet-600 text-white' : 'bg-white text-violet-800 border border-violet-300'}`}>
          {room.available ? 'BOOKED' : 'AVAILABLE'}
        </div>
        
        {/* Quick view button that appears on hover */}
        <div className="absolute bottom-3 right-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            className="bg-white/90 hover:bg-white text-violet-800 text-xs font-medium py-1.5 px-3 rounded-md shadow-sm transition-colors border border-violet-200"
            onClick={handleViewDetailsClick}
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Location */}
        <div className="flex items-center mb-3">
          <svg className="w-4 h-4 text-violet-600 mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
          </svg>
          <h3 className="text-gray-800 font-semibold text-base truncate">{room.location}</h3>
        </div>

        {/* Room Features */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center justify-center bg-violet-50 rounded-lg py-2.5 px-2">
                    <svg
            className="w-5 h-5 text-violet-600 mb-1"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="3" y="3" width="10" height="10" stroke="currentColor" fill="none" strokeWidth="2"/>
            <text x="14" y="12" fontSize="6" fill="currentColor" fontFamily="Arial">ft²</text>
          </svg>

            <span className="text-xs font-medium text-gray-700">{room.squareFeet} sq.ft</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-violet-50 rounded-lg py-2.5 px-2">
            <svg className="w-5 h-5 text-violet-600 mb-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
            </svg>
            <span className="text-xs font-medium text-gray-700">{room.beds} beds</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-violet-50 rounded-lg py-2.5 px-2">
            {room.acOrNonAc === 'AC' ? (
              <svg className="w-5 h-5 text-violet-600 mb-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5 text-violet-600 mb-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd"></path>
              </svg>
            )} 
            <span className="text-xs font-medium text-gray-700">{room.acOrNonAc}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-3"></div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-violet-800 font-bold text-xl">${formattedPrice}</p>
            <p className="text-gray-500 text-xs">per month</p>
          </div>
          <div>
            {showBookButton && (
              <button 
                className="px-4 py-2 bg-violet-600 text-white rounded-md text-sm font-semibold hover:bg-violet-700 transition-colors shadow-sm hover:shadow-md disabled:bg-violet-300 disabled:cursor-not-allowed"
                onClick={(e) => {
                  e.stopPropagation();
                  onBookClick();
                }}
                disabled={room.available}
              >
                Book Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;