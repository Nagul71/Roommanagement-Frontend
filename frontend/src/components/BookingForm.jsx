import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bookingService from '../services/bookingService';
import { FaCalendarAlt, FaClock, FaArrowLeft, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';

const BookingForm = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [bookingData, setBookingData] = useState({
    bookingDate: new Date().toISOString().split('T')[0],
    bookedDate: '', 
    rentalPeriod: '1 month'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await bookingService.createBooking(userId, roomId, bookingData);
      setSuccess('Booking request sent successfully!');
      setTimeout(() => navigate('/my-bookings'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to book room');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-violet-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-violet-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-700 to-purple-600 px-8 py-6 text-white">
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                <FaCalendarAlt className="text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Complete Your Booking</h2>
                <p className="text-violet-100 mt-1">Secure your perfect accommodation now</p>
              </div>
            </div>
          </div>
          
          {/* Form Content */}
          <div className="px-8 py-8">
            {/* Status Messages */}
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start">
                <FaTimesCircle className="text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-700">{error}</p>
                </div>
              </div>
            )}
            
            {success && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-start">
                <FaCheckCircle className="text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-green-700">{success}</p>
                  <p className="text-sm text-green-600 mt-1">Redirecting to your bookings...</p>
                </div>
              </div>
            )}

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Check-in Date Field */}
              <div>
                <label className="block text-sm font-medium text-violet-800 mb-2 flex items-center">
                  <FaCalendarAlt className="mr-2 text-violet-600" />
                  Check-in Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="bookedDate"
                    value={bookingData.bookedDate}
                    onChange={handleChange}
                    required
                    min={bookingData.bookingDate || new Date().toISOString().split('T')[0]}
                    className="block w-full pl-10 pr-3 py-3 border border-violet-200 rounded-xl bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-violet-800 placeholder-violet-400"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="h-5 w-5 text-violet-400" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-violet-500">Select your arrival date</p>
              </div>

              {/* Rental Period Field */}
              <div>
                <label className="block text-sm font-medium text-violet-800 mb-2 flex items-center">
                  <FaClock className="mr-2 text-violet-600" />
                  Rental Period
                </label>
                <div className="relative">
                  <select
                    name="rentalPeriod"
                    value={bookingData.rentalPeriod}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-10 py-3 border border-violet-200 rounded-xl bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-violet-800 appearance-none"
                  >
                    <option value="12 hours">12 hours</option>
                    <option value="24 hours">24 hours</option>
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaClock className="h-5 w-5 text-violet-400" />
                  </div>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-violet-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="mt-2 text-xs text-violet-500">Select your intended stay duration</p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-medium flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin mr-3" />
                      Processing Booking...
                    </>
                  ) : (
                    'Confirm Reservation'
                  )}
                </button>
              </div>
              
              {/* Cancel Link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center text-violet-600 hover:text-violet-800 text-sm font-medium transition-colors"
                >
                  <FaArrowLeft className="mr-2" />
                  Back to room details
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-violet-500">
            By completing this booking, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;