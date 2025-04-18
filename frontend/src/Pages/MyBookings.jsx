import React, { useEffect, useState } from 'react';
import bookingService from '../services/bookingService';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookingService.getUserBookings();
        setBookings(response.data);
        console.log(response.data);
      } catch (err) {
        setError('Failed to load bookings.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64 text-violet-700 font-medium">Loading bookings...</div>;
  if (error) return <div className="flex justify-center items-center h-64 text-red-500">{error}</div>;
  if (bookings.length === 0) return <div className="flex justify-center items-center h-64 text-violet-700">No bookings found.</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center text-violet-800 border-b border-violet-100 pb-4">My Bookings</h2>
      <ul className="space-y-5">
        {bookings.map((booking) => (
          <li
            key={booking.roomId}
            className="p-5 bg-white border-l-4 border-violet-500 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="text-sm text-gray-600"><span className="font-medium text-violet-700">Booking ID:</span> {booking.bookingId}</div>
              <div className="text-sm text-gray-600"><span className="font-medium text-violet-700">Room ID:</span> {booking.roomId || 'N/A'}</div>
              <div className="text-sm text-gray-600"><span className="font-medium text-violet-700">Booking Date:</span> {booking.bookingDate}</div>
              <div className="text-sm text-gray-600"><span className="font-medium text-violet-700">Booked For:</span> {booking.bookedDate}</div>
              <div className="text-sm text-gray-600"><span className="font-medium text-violet-700">Rental Period:</span> {booking.rentalPeriod}</div>
              <div className="text-sm text-gray-600">
                {/* <span className="font-medium text-violet-700">Status:</span>  */}
                <span className={`ml-1 font-medium ${
                  booking.status === 'Confirmed' ? 'text-green-600' : 
                  booking.status === 'Pending' ? 'text-yellow-600' : 
                  booking.status === 'Cancelled' ? 'text-red-600' : 'text-violet-600'
                }`}>{booking.status}</span>
              </div>
              {/* {booking.rating !== null && (
                <div className="text-sm text-gray-600 md:col-span-2">
                  <span className="font-medium text-violet-700">Rating:</span> 
                  <span className="ml-1 text-yellow-500">
                    {Array(booking.rating).fill('★').join('')}
                    {Array(5 - booking.rating).fill('☆').join('')}
                  </span>
                </div>
              )} */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;