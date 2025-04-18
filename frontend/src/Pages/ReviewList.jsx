import React, { useEffect, useState } from 'react';
import { Star, MessageSquare, User, MoreVertical } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import reviewService from '../Services/ReviewService';

const ReviewsList = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null); // Track which review's menu is open
  
//   const [reviewToDelete, setReviewToDelete] = useState(null);
  const [reviewsList, setReviewsList] = useState([]);


  const handleMenuToggle = (reviewId) => {
    setOpenMenu(openMenu === reviewId ? null : reviewId);
  };    

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await reviewService.getReviewsByRoom(roomId);
      setReviewsList(res.data);
    };
    fetchReviews();
  }, [reviewsList]);
  

  const page = () => {
    navigate(`/rooms/${roomId}/review`);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <MessageSquare className="mr-2 text-violet-600" />
        {reviewsList.length} {reviewsList.length === 1 ? 'Review' : 'Reviews'}
      </h3>

      {reviewsList.length === 0 ? (
        <div className="bg-violet-50 border border-violet-200 rounded-lg p-6 text-center">
          <p className="text-violet-700">No reviews yet. Be the first to review!</p>
          <button 
            onClick={page} 
            className="mt-4 px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
          >
            Click to review
          </button>
        </div>
      ) : (
        reviewsList.map((review) => (
          <div key={review.reviewId} className="bg-white rounded-lg shadow-sm p-5 border border-gray-100 relative">
            <div className="flex items-center mb-4 justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center mr-3">
                  <User className="text-violet-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{review.user?.name || 'Anonymous'}</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'fill-current' : ''}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">
                      {new Date(review.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Three dots icon */}
              <div className="relative">
                <MoreVertical 
                  className="cursor-pointer text-gray-500 hover:text-gray-700" 
                  onClick={() => handleMenuToggle(review.reviewId)} 
                />
                {openMenu === review.reviewId && (
                  <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-lg z-10">
                    <button
                        onClick={async () => {
                            try {
                            await reviewService.deleteReview(review.reviewId);
                            setOpenMenu(null);
                            } catch (err) {
                            console.error(err);
                            alert(err.response?.data?.message || "Failed to delete review");
                            }
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                        Delete
                    </button>


                  </div>
                )}
              </div>
            </div>

            <p className="text-gray-700">{review.reviewDesc}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewsList;
