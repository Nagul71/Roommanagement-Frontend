// src/services/bookingService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/bookings';

const createBooking = (roomId, bookingData) => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    throw new Error('User not authenticated');
  }
  
  return axios.post(`${API_URL}/createbooking`, {
    ...bookingData,
    userId,
    roomId
  });
};

const getUserBookings = () => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    throw new Error('User not authenticated');
  }
  return axios.get(`${API_URL}/user/${userId}`);
};

const getRoomBookings = (roomId) => {
  return axios.get(`${API_URL}/room/${roomId}`);
};

const updateBookingStatus = (bookingId, status) => {
  return axios.patch(`${API_URL}/${bookingId}/status`, { status });
};

export default {
  createBooking,
  getUserBookings,
  getRoomBookings,
  updateBookingStatus
};