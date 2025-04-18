import axios from 'axios';

const API_URL = 'http://localhost:8080/support';

const addSupportRequest = (requestData) => {
  return axios.post(`${API_URL}/addrequest`, requestData);
};

const getSupportRequests = () => {
  const userId = localStorage.getItem('userId');
  return axios.get(`${API_URL}/user/${userId}`);
};

const getSupportRequest = (requestId) => {
  return axios.get(`${API_URL}/${requestId}`);
};

const updateRequestStatus = (requestId, status) => {
  return axios.patch(`${API_URL}/${requestId}/status`, { status });
};

const addResponseToRequest = (requestId, response) => {
  return axios.patch(`${API_URL}/${requestId}/response`, { response });
};

export default {
  addSupportRequest,
  getSupportRequests,
  getSupportRequest,
  updateRequestStatus,
  addResponseToRequest
};