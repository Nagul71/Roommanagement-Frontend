import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supportService from '../Services/supportService';
import SupportRequestsList from './SupportRequestList';

const SupportPage = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await supportService.getSupportRequests();
        setRequests(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch support requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="bg-gradient-to-br from-violet-50 to-white min-h-screen pb-12">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b border-violet-100 pb-6">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-violet-600 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-1.008m11.083-9.992A8.932 8.932 0 0118 10c0 2.917-1.927 5.418-4.623 6.749" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 10a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-800 to-violet-500">Customer Support</h1>
            </div>
            <button 
              onClick={() => navigate('/support/page')}
              className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out hover:-translate-y-1 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Support Request
            </button>
          </div>

          <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center text-violet-600 hover:text-violet-800 font-medium transition duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>

          {loading ? (
            <div className="flex flex-col justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-violet-600"></div>
              <p className="mt-4 text-violet-600 font-medium">Loading your requests...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-md">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 bg-red-100 hover:bg-red-200 text-red-700 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          ) : requests.length === 0 ? (
            <div className="bg-violet-50 border border-violet-200 rounded-lg p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="mt-4 text-xl font-semibold text-violet-800">No Support Requests</h3>
              <p className="mt-2 text-violet-600">You don't have any support requests yet. Need help? Create a new request.</p>
              <button 
                onClick={() => navigate('/support/page')}
                className="mt-6 bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
              >
                Create First Request
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg">
              <div className="border-b border-violet-100 pb-4 mb-4">
                <h2 className="text-xl font-semibold text-violet-900">Your Support Tickets</h2>
                <p className="text-gray-600">Track and manage your support requests</p>
              </div>
              <SupportRequestsList requests={requests} />
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-violet-900 mb-4">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-violet-400 pl-4">
              <h3 className="font-medium text-violet-800">How long does support take to respond?</h3>
              <p className="text-gray-600 mt-1">Our team typically responds within 24-48 hours to all support requests.</p>
            </div>
            <div className="border-l-4 border-violet-400 pl-4">
              <h3 className="font-medium text-violet-800">Can I update my request?</h3>
              <p className="text-gray-600 mt-1">Yes, you can add comments or additional information to any open ticket.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;