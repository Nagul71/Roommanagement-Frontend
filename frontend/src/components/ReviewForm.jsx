import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ChevronRight, X } from 'lucide-react';
import reviewService from '../services/reviewService';

const ReviewForm = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getUserId = () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('User not authenticated. Please login first.');
    }
    return userId;
  };

  const userId = getUserId();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await reviewService.addReview({
        roomId,
        reviewDesc: reviewText,
        rating,
        userId
      });
      navigate(-1); // Go back after successful submission
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-violet-100">
        <div className="bg-gradient-to-r from-violet-600 to-violet-800 px-6 py-6 text-white">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 bg-white/20 p-2 rounded-full">
              <Star className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Leave a Review</h2>
          </div>
          <p className="mt-2 text-violet-100 text-sm">Share your experience with this property</p>
        </div>
        
        <div className="px-6 py-8">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start">
              <div className="flex-shrink-0">
                <X className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-3">Your Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <Star
                      className={`h-8 w-8 ${(hoverRating || rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                rows="4"
                className="focus:ring-violet-500 focus:border-violet-500 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-sm"
                placeholder="Share details about your experience..."
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-violet-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-violet-700 transition duration-200 font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Review'
                )}
              </button>
            </div>
            
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-violet-600 hover:text-violet-800 text-sm font-medium transition duration-200"
              >
                Cancel and return
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;