import axios from 'axios';

const API_URL = 'http://localhost:8080/api/reviews';



const addReview = (reviewData) => {
  return axios.post(`${API_URL}/add`, reviewData);
};

const getReviewsByRoom = (roomId) => {
  return axios.get(`${API_URL}/room/${roomId}`);
};

const getReviewsByUser = () => {
  const userId = localStorage.getItem('userId');
  return axios.get(`${API_URL}/user/${userId}`);
};

const deleteReview = (reviewId) => {
  return axios.delete(`${API_URL}/${reviewId}`);
};

export default {
  addReview,
  getReviewsByRoom,
  getReviewsByUser,
  deleteReview
};