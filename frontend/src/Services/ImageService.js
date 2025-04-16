// src/services/imageService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/images';

const uploadImage = (formData) => {
  return axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

const getRoomImages = (roomId) => {
  return axios.get(`${API_URL}/room/${roomId}`);
};

const deleteImage = (imageId) => {
  return axios.delete(`${API_URL}/${imageId}`);
};

export default {
  uploadImage,
  getRoomImages,
  deleteImage
};