// src/services/roomService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/rooms';

const createRoom = (roomData) => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    throw new Error('User not authenticated');
  }
  return axios.post(`${API_URL}/${userId}/rooms`, roomData);
};

const getRoomsCreatedByUser = () => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    throw new Error('User not authenticated');
  }
  return axios.get(`${API_URL}/get/${userId}/rooms`);
};

const getRoomDetails = (roomId) => {
  return axios.get(`${API_URL}/${roomId}`);
};

const getAllRooms = () => {
    return axios.get(`${API_URL}/getallrooms`);
  };

export default {
  createRoom,
  getRoomsCreatedByUser,
  getRoomDetails,
  getAllRooms
};