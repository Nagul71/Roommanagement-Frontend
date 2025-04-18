import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supportService from '../Services/supportService';
import SupportRequestDetail from './SupportRequestDetail';

const SupportRequestPage = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await supportService.getSupportRequest(requestId);
        setRequest(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch support request');
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [requestId]);

  return (
    <div className="bg-gradient-to-br from-violet-50 to-white min-h-screen pb-12">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
        </div>
        

        <div className="bg-white rounded-xl shadow-lg p-6">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-violet-600"></div>
              <p className="mt-4 text-violet-600 font-medium">Loading request details...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-red-800">Error Loading Request</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
              <div className="mt-6 flex space-x-4">
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-red-100 hover:bg-red-200 text-red-700 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  Try Again
                </button>
                <button 
                  onClick={() => navigate('/support')} 
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  Return to Support
                </button>
              </div>
            </div>
          ) : !request ? (
            <div className="bg-violet-50 border border-violet-200 rounded-lg p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-xl font-semibold text-violet-800">Request Not Found</h3>
              <p className="mt-2 text-violet-600">We couldn't find the support request you're looking for.</p>
              <button 
                onClick={() => navigate('/support')} 
                className="mt-6 bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
              >
                View All Support Requests
              </button>
            </div>
          ) : (
            <>
              
              <SupportRequestDetail request={request} />
              
             
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportRequestPage;