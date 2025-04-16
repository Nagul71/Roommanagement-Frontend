// src/components/BookingForm.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bookingService from '../services/bookingService';

const BookingForm = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({
    bookingDate: '',
    bookedDate: '',
    rentalPeriod: '1 month'
  });
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

    try {
      await bookingService.createBooking(roomId, bookingData);
      setSuccess('Booking request sent successfully!');
      setTimeout(() => navigate('/my-bookings'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to book room');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Book This Room</h2>
      
      {error && (
        <div className="mb-4 text-red-600 bg-red-100 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 text-green-600 bg-green-100 px-4 py-2 rounded-lg">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-medium mb-1">Booking Date</label>
          <input
            type="date"
            name="bookingDate"
            value={bookingData.bookingDate}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Check-in Date</label>
          <input
            type="date"
            name="bookedDate"
            value={bookingData.bookedDate}
            onChange={handleChange}
            required
            min={bookingData.bookingDate || new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Rental Period</label>
          <select
            name="rentalPeriod"
            value={bookingData.rentalPeriod}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1 week">1 week</option>
            <option value="1 month">1 month</option>
            <option value="3 months">3 months</option>
            <option value="6 months">6 months</option>
            <option value="1 year">1 year</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
