import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, ChevronRight, X } from 'lucide-react';
import supportService from '../services/supportService';

const SupportRequestForm = () => {
  const navigate = useNavigate();
  const [issue, setIssue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const userId = localStorage.getItem("userId")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await supportService.addSupportRequest({
        issueDesc: issue,
        userId
      });
      setSuccess('Your support request has been submitted successfully!');
      setTimeout(() => navigate('/support'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit support request');
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
              <HelpCircle className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Contact Support</h2>
          </div>
          <p className="mt-2 text-violet-100 text-sm">We're here to help with any issues</p>
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
          
          {success && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg flex items-start">
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-700">{success}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">Describe your issue</label>
              <textarea
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                required
                rows="5"
                className="focus:ring-violet-500 focus:border-violet-500 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-sm"
                placeholder="Please describe your issue in detail..."
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
                  'Submit Request'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupportRequestForm;