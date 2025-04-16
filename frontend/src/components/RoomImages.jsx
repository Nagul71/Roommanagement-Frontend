// src/components/RoomImages.js
import React, { useState, useEffect } from 'react';
import roomService from '../Services/roomService';

const RoomImages = ({ roomId }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await imageService.getRoomImages(roomId);
        setImages(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [roomId]);

  const handleDelete = async (imageId) => {
    try {
      await imageService.deleteImage(imageId);
      setImages(prev => prev.filter(img => img.imgId !== imageId));
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to delete image');
    }
  };

  if (loading) return <div>Loading images...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="room-images-container">
      <h3>Room Images</h3>
      <div className="image-grid">
        {images.map(image => (
          <div key={image.imgId} className="image-item">
            <img 
              src={image.imgUrl} 
              alt="Room" 
              className="room-image"
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg';
              }}
            />
            <button
              className="delete-image-button"
              onClick={() => handleDelete(image.imgId)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomImages;