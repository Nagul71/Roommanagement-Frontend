// src/pages/EditRoom.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import roomService from '../Services/roomService';
import ImageService from '../Services/ImageService';

const EditRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [images, setImages] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [imageError, setImageError] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    location: '',
    squareFeet: '',
    beds: '',
    acOrNonAc: '',
    price: '',
    description: '',
    amenities: []
  });

  // Fetch room data
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await roomService.getRoomDetails(roomId);
        const roomData = response.data;
        
        setFormData({
          location: roomData.location || '',
          squareFeet: roomData.squareFeet || '',
          beds: roomData.beds || '',
          acOrNonAc: roomData.acOrNonAc || '',
          price: roomData.price || '',
          description: roomData.description || '',
          amenities: roomData.amenities || []
        });

        const imgRes = await ImageService.getRoomImages(roomId);
        setImages(imgRes.data || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch room data');
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [roomId]); // Removed images from dependencies to prevent infinite loop

  const fetchRoomImages = async () => {
    try {
      const imgRes = await ImageService.getRoomImages(roomId);
      setImages(imgRes.data || []);
    } catch (err) {
      setImageError('Failed to fetch updated images');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (checked) {
        setFormData({
          ...formData,
          amenities: [...formData.amenities, name]
        });
      } else {
        setFormData({
          ...formData,
          amenities: formData.amenities.filter(amenity => amenity !== name)
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;
    
    setImageError('');
    setUploadingImages(true);
    
    try {
      // Validate files
      files.forEach(file => {
        if (!file.type.match('image.*')) {
          throw new Error('Only image files are allowed');
        }
        if (file.size > 5 * 1024 * 1024) {
          throw new Error('Image size should not exceed 5MB');
        }
      });
      
      const formData = new FormData();
      files.forEach(file => {
        formData.append('file', file);
      });
      formData.append('roomId', roomId);
      
      const response = await ImageService.uploadImage(formData);
      
      // Handle different response structures
      const newImages = Array.isArray(response.data) ? response.data : 
                       response.data.images ? response.data.images : 
                       [response.data];
      
      setImages([...images, ...newImages]);
      setSuccess('Images uploaded successfully');
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setImageError(err.response?.data?.message || err.message || 'Failed to upload images');
      console.error('Upload error:', err); // Add logging for debugging
    } finally {
      setUploadingImages(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      // Optimistically update UI
      const tempImages = images.filter(img => img.id !== imageId);
      setImages(tempImages);
      
      // Then make the API call
      await ImageService.deleteImage(imageId);
      
      // Verify by refetching
      await fetchRoomImages();
      
      setSuccess('Image deleted successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      // Revert if failed
      setImages(images);
      setImageError(err.response?.data?.message || 'Failed to delete image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      // Validate form
      if (!formData.location || !formData.price) {
        throw new Error('Location and price are required');
      }
      
      // Convert numeric strings to numbers
      const dataToSubmit = {
        ...formData,
        squareFeet: Number(formData.squareFeet),
        beds: Number(formData.beds),
        price: Number(formData.price)
      };
      
      // Update room data
      await roomService.updateRoombyid(roomId, dataToSubmit);
      
      setSuccess('Room updated successfully');
      
      // Navigate back to My Rooms after 2 seconds
      setTimeout(() => {
        navigate('/my-rooms');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to update room');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b pb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Edit Room</h2>
        <button
          onClick={() => navigate('/my-rooms')}
          className="inline-flex items-center text-violet-600 hover:text-violet-800 font-medium transition duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to My Rooms
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow">
          <div className="flex items-center">
            <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded shadow">
          <div className="flex items-center">
            <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {success}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Location */}
          <div className="col-span-2">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location*
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Square Feet */}
          <div>
            <label htmlFor="squareFeet" className="block text-sm font-medium text-gray-700 mb-1">
              Square Feet
            </label>
            <input
              type="number"
              id="squareFeet"
              name="squareFeet"
              value={formData.squareFeet}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Beds */}
          <div>
            <label htmlFor="beds" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Beds
            </label>
            <input
              type="number"
              id="beds"
              name="beds"
              value={formData.beds}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* AC or Non-AC */}
          <div>
            <label htmlFor="acOrNonAc" className="block text-sm font-medium text-gray-700 mb-1">
              AC or Non-AC
            </label>
            <select
              id="acOrNonAc"
              name="acOrNonAc"
              value={formData.acOrNonAc}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Option</option>
              <option value="AC">AC</option>
              <option value="Non-AC">Non-AC</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price per Month ($)*
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>


        </div>

        {/* Room Images Section */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Room Images</h3>
          
          {imageError && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded text-sm">
              {imageError}
            </div>
          )}

          {/* Current Images */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {images.length > 0 ? (
              images.map((image) => (
                <div key={image.imgId} className="relative group">
                  <img
                    src={image.imgUrl}
                    alt="Room"
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(image.imgId)}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center py-8 bg-gray-50 rounded-md border border-dashed border-gray-300">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">No images uploaded yet</p>
              </div>
            )}
          </div>

          {/* Upload New Images */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload New Images
            </label>
            <div className="flex items-center">
              <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                <span>{uploadingImages ? 'Uploading...' : 'Select Files'}</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploadingImages}
                />
              </label>
              <p className="ml-3 text-xs text-gray-500">
                Upload up to 5 images (max 5MB each)
              </p>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/my-rooms')}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRoom;