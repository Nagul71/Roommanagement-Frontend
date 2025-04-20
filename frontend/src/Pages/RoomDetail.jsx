import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import roomService from '../Services/roomService';
import reviewService from '../Services/ReviewService';
import ReviewsList from './ReviewList';

const RoomDetail = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const thumbnailsRef = useRef(null);

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

  // Auto-rotate carousel
  useEffect(() => {
    if (!room?.images?.length) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, [activeImage, room]);

  // Scroll to active thumbnail
  useEffect(() => {
    if (thumbnailsRef.current && room?.images?.length) {
      const thumbnailEls = thumbnailsRef.current.querySelectorAll('.thumbnail-item');
      if (thumbnailEls[activeImage]) {
        thumbnailEls[activeImage].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeImage, room]);

  const nextSlide = () => {
    if (!room?.images?.length) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveImage((prev) => (prev === room.images.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
    }, 300);
  };

  const prevSlide = () => {
    if (!room?.images?.length) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveImage((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 300);
  };

  const goToSlide = (index) => {
    if (index === activeImage) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveImage(index);
      setIsTransitioning(false);
    }, 300);
  };

  if (loading) return <div className="text-center text-violet-500 text-lg mt-10">Loading room details...</div>;
  if (error) return <div className="text-center text-red-500 text-lg mt-10">{error}</div>;
  if (!room) return <div className="text-center text-gray-500 text-lg mt-10">Room not found</div>;

  return (
    <div className="bg-violet-50 min-h-screen pb-10">
      
      <div className="max-w-5xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate('/browse-rooms')}
          className="mb-6 inline-flex items-center text-violet-600 hover:text-violet-800 font-medium transition duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-violet-900 mb-2 md:mb-0">{room.location}</h1>
        </div>

        {room.images?.length > 0 ? (
          <div className="mb-10">
            {/* Carousel Container */}
            <div className="relative rounded-2xl shadow-md border border-violet-200 bg-white mb-4 overflow-hidden h-80 md:h-96 group">
              {/* Image Slides */}
              {room.images.map((image, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 w-full h-full transition-all duration-500 transform ${
                    index === activeImage 
                      ? 'opacity-100 translate-x-0 z-10' 
                      : (
                        index < activeImage 
                          ? 'opacity-0 -translate-x-full' 
                          : 'opacity-0 translate-x-full'
                      )
                  } ${isTransitioning ? 'opacity-60' : ''}`}
                >
                  <img
                    src={image.imgUrl}
                    alt={`Room view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              
              {/* Prev Button */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 shadow-md z-20 opacity-0 group-hover:opacity-100 transform transition-all duration-300 hover:scale-110"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Next Button */}
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 shadow-md z-20 opacity-0 group-hover:opacity-100 transform transition-all duration-300 hover:scale-110"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Indicators */}
              <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                {room.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeImage 
                        ? 'bg-violet-600 w-6' 
                        : 'bg-white bg-opacity-60 hover:bg-opacity-90'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Thumbnails - Horizontal Scrollable Row */}
            <div 
              ref={thumbnailsRef}
              className="flex overflow-x-auto pb-2 hide-scrollbar space-x-2"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {room.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`thumbnail-item flex-shrink-0 w-50 h-20 overflow-hidden rounded-lg shadow-sm cursor-pointer transition-all duration-300 transform mt-10${
                    activeImage === index 
                      ? 'ring-2 ring-violet-500 scale-105 shadow-md' 
                      : 'opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                  onClick={() => goToSlide(index)}
                >
                  <img
                    src={image.imgUrl}
                    alt={`Room thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            
            {/* Add custom CSS to hide scrollbars but keep functionality */}
            <style jsx>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
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
            </ul>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 border border-violet-200">
            <h3 className="text-xl font-semibold text-violet-800 mb-4">Description</h3>
            <p className="text-violet-700 leading-relaxed">
              Beautiful room located in {room.location}. {room.acOrNonAc === 'AC' ? 'Air conditioned' : 'Non air conditioned'} with {room.beds} comfortable bed{room.beds > 1 ? 's' : ''}.
            </p>

            <section className="mt-12">
              <ReviewsList />
            </section>
            
            <div className="mt-6 pt-6 border-t border-violet-100">
              <button
                onClick={() => navigate(`/book-room/${room.roomId}`)}
                className="w-full bg-violet-600 text-white py-3 px-4 rounded-xl shadow-md hover:bg-violet-700 transition duration-200 font-medium flex items-center justify-center"
                // disabled={!room.available} // Fixed logic - disabled when NOT available
              >
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Book This Room
                </>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;