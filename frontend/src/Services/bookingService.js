// src/services/bookingService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/bookings';

const getUserId = () => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    throw new Error('User not authenticated. Please login first.');
  }
  return userId;
};

const createBooking = (userId, roomId, bookingData) => {
  return axios.post(`${API_URL}/createbooking`, {
    ...bookingData,
    userId,
    roomId
  });
  
};

const getUserBookings = async () => {
  const userId = getUserId();
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