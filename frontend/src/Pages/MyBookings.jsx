import React, { useEffect, useState } from 'react';
import bookingService from '../services/bookingService';
import roomService from '../Services/roomService';
import { FaHotel, FaCalendarAlt, FaMoneyBillWave, FaTimesCircle, FaCheckCircle, FaHourglassHalf, FaTrashAlt, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [roomImages, setRoomImages] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookingsAndImages();
  }, []);

  const fetchBookingsAndImages = async () => {
    try {
      setLoading(true);
      const bookingsResponse = await bookingService.getUserBookings();
      setBookings(bookingsResponse.data);
      
      const imagesMap = {};
      await Promise.all(
        bookingsResponse.data.map(async (booking) => {
          if (booking.roomId) {
            try {
              const roomResponse = await roomService.getRoomDetails(booking.roomId);
              if (roomResponse.data?.images?.[0]?.imgUrl) {
                imagesMap[booking.roomId] = roomResponse.data.images[0].imgUrl;
              }
            } catch (err) {
              console.error(`Failed to fetch images for room ${booking.roomId}:`, err);
            }
          }
        })
      );
      setRoomImages(imagesMap);
    } catch (err) {
      setError('Failed to load bookings. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!bookingToDelete) return;
    
    try {
      const response = await bookingService.cancelBooking(bookingToDelete);
      setSuccess('Booking cancelled successfully');
      setShowDeleteModal(false);
      fetchBookingsAndImages(); // Refresh the list
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel booking');
      setShowDeleteModal(false);
      setTimeout(() => setError(''), 3000);
    }
  };

  const openDeleteModal = (bookingId) => {
    setBookingToDelete(bookingId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setBookingToDelete(null);
  };

  // Sort bookings to have active bookings first
  const sortedBookings = [...bookings].sort((a, b) => {
    const statusOrder = {
      'CONFIRMED': 1,
      'PENDING': 2,
      'COMPLETED': 3,
      'CANCELLED': 4
    };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <div className="flex items-center">
          <FaTimesCircle className="text-red-500 mr-2" />
          <span className="text-red-700 font-medium">{error}</span>
        </div>
      </div>
    </div>
  );

  if (sortedBookings.length === 0) return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-sm">
      <div className="text-center py-12">
        <FaHotel className="mx-auto text-5xl text-violet-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-700 mb-2">No bookings found</h3>
        <p className="text-gray-500">You haven't made any bookings yet.</p>
      </div>
    </div>
  );

  return (

        
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        
        
      {/* Success/Error Messages */}
      {success && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
          <div className="flex items-center">
            <FaCheckCircle className="text-green-500 mr-2" />
            <span className="text-green-700 font-medium">{success}</span>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-violet-800 mb-2">My Bookings</h1>
        <p className="text-gray-600">View and manage your accommodation bookings</p>
      </div>

      <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 inline-flex items-center text-violet-600 hover:text-violet-800 font-medium transition duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>

      {/* Bookings List */}
      <div className="space-y-6">
        {sortedBookings.map((booking) => (
          <div 
            key={booking.bookingId} 
            className={`bg-white rounded-xl shadow-sm overflow-hidden border-l-4 ${
              booking.status === 'CONFIRMED' ? 'border-green-500' :
              booking.status === 'PENDING' ? 'border-yellow-500' :
              booking.status === 'CANCELLED' ? 'border-red-500' : 'border-violet-500'
            }`}
          >
            <div className="flex flex-col md:flex-row">
              {/* Room Image */}
              {booking.roomId && roomImages[booking.roomId] && (
                <div className="md:w-1/3">
                  <img 
                    src={roomImages[booking.roomId]} 
                    alt="Room" 
                    className="w-full h-48 md:h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                  />
                </div>
              )}

              {/* Booking Details */}
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {booking.roomId ? `Room #${booking.roomId}` : 'Unknown Room'}
                    </h3>
                    <div className="flex items-center mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                        booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : 'bg-violet-100 text-violet-800'
                      }`}>
                        {booking.status === 'PENDING' && <FaHourglassHalf className="mr-1" />}
                        {booking.status === 'CONFIRMED' && <FaCheckCircle className="mr-1" />}
                        {booking.status === 'CANCELLED' && <FaTimesCircle className="mr-1" />}
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Booking ID</p>
                    <p className="font-mono text-gray-700">{booking.bookingId}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <FaCalendarAlt className="text-violet-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Booking Date</p>
                      <p className="text-gray-800">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaCalendarAlt className="text-violet-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Booked For</p>
                      <p className="text-gray-800">{new Date(booking.bookedDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaInfoCircle className="text-violet-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Rental Period</p>
                      <p className="text-gray-800">{booking.rentalPeriod}</p>
                    </div>
                  </div>

                  {booking.price && (
                    <div className="flex items-start">
                      <FaMoneyBillWave className="text-violet-500 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Total Price</p>
                        <p className="text-gray-800">${booking.price.toFixed(2)}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {(booking.status === 'PENDING' || booking.status === 'CONFIRMED') && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => openDeleteModal(booking.bookingId)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-150"
                    >
                      <FaTrashAlt className="mr-2" />
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/20">
    <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-scale-fade">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <FaTimesCircle className="text-red-500 text-2xl mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Cancel Booking</h3>
        </div>
        <div className="mb-6">
          <p className="text-gray-600">
            Are you sure you want to cancel this booking? This action cannot be undone.
          </p>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={closeDeleteModal}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Go Back
          </button>
          <button
            onClick={handleCancelBooking}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Confirm Cancellation
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>

    
  );
};

<style>
{`
  @keyframes scale-fade {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-scale-fade {
    animation: scale-fade 0.3s ease-out;
  }
`}
</style>


export default MyBookings;