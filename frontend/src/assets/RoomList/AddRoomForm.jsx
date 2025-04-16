import React, { useState } from 'react';
import { Home, Image, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AddRoomForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    squareFeet: '',
    location: '',
    status: 'Available', // Default value
    beds: 1,
    available: true,
    acOrNonAc: 'AC', // Default value
    price: '',
  });

  // Images state
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle file input changes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
    
    // Create preview URLs for the images
    const newPreviewImages = files.map(file => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviewImages]);
  };

  // Remove an image from the list
  const removeImage = (index) => {
    const updatedImages = [...images];
    const updatedPreviews = [...previewImages];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(previewImages[index]);
    
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    
    setImages(updatedImages);
    setPreviewImages(updatedPreviews);
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // In a real application, you would send this data to your backend
      // For now, we'll simulate a successful submission
      const userId = "current-user-id"; // In a real app, this would come from auth context
      
      const roomData = {
        ...formData,
        squareFeet: parseFloat(formData.squareFeet),
        beds: parseInt(formData.beds),
        price: parseFloat(formData.price),
      };
      
      // Example of API call (commented out)
      /*
      const response = await fetch(`/rooms/${userId}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create room');
      }
      
      const data = await response.json();
      */
      
      // Simulate successful submission
      setTimeout(() => {
        setSubmitSuccess(true);
        setIsSubmitting(false);
        
        // Reset form after 2 seconds
        setTimeout(() => {
          setFormData({
            squareFeet: '',
            location: '',
            status: 'Available',
            beds: 1,
            available: true,
            acOrNonAc: 'AC',
            price: '',
          });
          setImages([]);
          setPreviewImages([]);
          setSubmitSuccess(false);
        }, 2000);
      }, 1000);
      
    } catch (error) {
      setSubmitError(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-violet-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">RoomMate</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Add New Room</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Link to ='/dashboard'>
            <button className="flex items-center text-violet-700 hover:text-violet-900 transition-colors">
              <ArrowLeft size={18} className="mr-1" />
              <span>Back to Dashboard</span>
            </button>
            </Link>
          </div>

          {/* Page Title */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Home size={24} className="mr-2 text-violet-600" />
              Add New Room
            </h2>
            <p className="text-gray-600 mt-1">
              Fill in the details below to list your room for rent
            </p>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg flex items-center text-green-800">
              <CheckCircle size={20} className="mr-2" />
              Room created successfully! Redirecting to dashboard...
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-lg flex items-center text-red-800">
              <XCircle size={20} className="mr-2" />
              Error: {submitError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
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
                  onChange={handleInputChange}
                  required
                  placeholder="Enter the full address"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>

              {/* Square Feet */}
              <div>
                <label htmlFor="squareFeet" className="block text-sm font-medium text-gray-700 mb-1">
                  Square Feet*
                </label>
                <input
                  type="number"
                  id="squareFeet"
                  name="squareFeet"
                  min="1"
                  value={formData.squareFeet}
                  onChange={handleInputChange}
                  required
                  placeholder="Room size in sq. ft."
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>

              {/* Number of Beds */}
              <div>
                <label htmlFor="beds" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Beds*
                </label>
                <input
                  type="number"
                  id="beds"
                  name="beds"
                  min="1"
                  value={formData.beds}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
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
                  min="1"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  placeholder="Monthly rent"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>

              {/* AC/Non-AC */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Air Conditioning*
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="acOrNonAc"
                      value="AC"
                      checked={formData.acOrNonAc === 'AC'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-violet-600 focus:ring-violet-500"
                    />
                    <span className="ml-2 text-gray-700">AC</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="acOrNonAc"
                      value="Non-AC"
                      checked={formData.acOrNonAc === 'Non-AC'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-violet-600 focus:ring-violet-500"
                    />
                    <span className="ml-2 text-gray-700">Non-AC</span>
                  </label>
                </div>
              </div>


              {/* Image Upload */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Photos
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <Image size={48} className="text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    Drag and drop images here, or click to select files
                  </p>
                  <p className="text-xs text-gray-400 mb-4">
                    JPG, PNG or GIF • Max 5MB each • Up to 5 images
                  </p>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="images"
                    className="inline-block px-4 py-2 bg-violet-100 text-violet-700 rounded-lg cursor-pointer hover:bg-violet-200 transition-colors"
                  >
                    Select Images
                  </label>
                </div>

                {/* Image Preview */}
                {previewImages.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Selected Images:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {previewImages.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Room preview ${index + 1}`}
                            className="h-24 w-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <XCircle size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-violet-600 hover:bg-violet-700 text-white'
                }`}
              >
                {isSubmitting ? 'Creating Room...' : 'Create Room'}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t py-4 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2025 RoomMate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AddRoomForm;