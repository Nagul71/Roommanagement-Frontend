// src/components/RoomForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import roomService from '../Services/roomService';
import imageService from '../Services/ImageService';

const RoomForm = () => {
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState({
    squareFeet: '',
    location: '',
    beds: 1,
    acOrNonAc: 'AC',
    price: ''
  });
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (files) => {
    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(file => {
        return new Promise(async (resolve, reject) => {
          try {
            const reader = new FileReader();
            reader.onload = async (e) => {
              const previewUrl = e.target.result;
              resolve({ file, previewUrl, status: 'pending' });
            };
            reader.readAsDataURL(file);
          } catch (err) {
            reject(err);
          }
        });
      });

      const imagePreviews = await Promise.all(uploadPromises);
      setImages(prev => [...prev, ...imagePreviews]);
    } catch (err) {
      setError('Failed to process images');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      // First create the room
      const roomResponse = await roomService.createRoom({
        ...roomData,
        squareFeet: parseFloat(roomData.squareFeet),
        beds: parseInt(roomData.beds),
        price: parseFloat(roomData.price)
      });
  
      const roomId = roomResponse.data.roomId;
      
      // Then upload images if any
      if (images.length > 0) {
        setUploading(true);
        const uploadPromises = images.map(img => {
          const formData = new FormData();
          formData.append('file', img.file);
          formData.append('roomId', roomId);
          console.log(formData);
          return imageService.uploadImage(formData);
        });
        
        await Promise.all(uploadPromises);
      }
  
      setSuccess('Room created with images successfully!');
      setTimeout(() => navigate('/create-room'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create room');
      console.error('Error:', err); // Add this for debugging
    } finally {
      setUploading(false);
    }
  };


  return (
    <div className="bg-violet-50 min-h-screen py-10 px-4">
      <div className="room-form-container max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl border border-violet-200">
        <h2 className="text-2xl font-semibold text-violet-900 mb-6">Create New Room Listing</h2>

        {error && <div className="alert alert-danger text-red-500 p-4 bg-red-50 rounded-md mb-4 border border-red-200">{error}</div>}
        {success && <div className="alert alert-success text-green-500 p-4 bg-green-50 rounded-md mb-4 border border-green-200">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="form-group">
            <label className="block text-sm font-medium text-violet-700 mb-1">Square Feet</label>
            <input
              type="number"
              name="squareFeet"
              value={roomData.squareFeet}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-violet-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-violet-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={roomData.location}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-violet-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
              required
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-violet-700 mb-1">Number of Beds</label>
            <input
              type="number"
              name="beds"
              value={roomData.beds}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-violet-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-violet-700 mb-1">AC/Non-AC</label>
            <select
              name="acOrNonAc"
              value={roomData.acOrNonAc}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-violet-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
              required
            >
              <option value="AC">Air Conditioned</option>
              <option value="NON_AC">Non Air Conditioned</option>
            </select>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-violet-700 mb-1">Price (per month)</label>
            <input
              type="number"
              name="price"
              value={roomData.price}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-violet-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-violet-700 mb-1">Room Images</label>
            <div className="image-upload-container mt-2">
              <label className="inline-block bg-violet-600 text-white py-2 px-4 rounded-xl cursor-pointer hover:bg-violet-700 transition duration-200 shadow-sm">
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleImageUpload(e.target.files)}
                  className="hidden"
                  accept="image/*"
                  disabled={uploading}
                />
                <div className="flex justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {uploading ? 'Uploading...' : 'Select Images'}
                </div>
              </label>

              <div className="image-preview-grid mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <div key={index} className="relative group">
                    <div className="overflow-hidden rounded-lg shadow-sm border border-violet-200 aspect-square">
                      <img src={img.previewUrl} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    </div>
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center text-xs shadow-md hover:bg-red-600 transition"
                      onClick={() => handleRemoveImage(index)}
                      disabled={uploading}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-violet-600 text-white py-3 px-4 rounded-xl shadow-md hover:bg-violet-700 disabled:bg-violet-300 disabled:cursor-not-allowed transition duration-200 font-medium"
              disabled={uploading}
            >
              {uploading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Room...
                </div>
              ) : (
                'Create Room'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomForm;