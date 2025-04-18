import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HelpCircle, Clock, CheckCircle, XCircle, ChevronLeft, MessageSquare } from 'lucide-react';
import SupportRequestPage from './SupportRequestPage';

const SupportRequestDetail = ({ request }) => {
  const navigate = useNavigate();
  
  const getStatusIcon = (status) => {
    switch(status) {
      case 'OPEN':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'RESOLVED':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'CANCELLED':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <HelpCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-violet-600 hover:text-violet-800 mb-4"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to requests
        </button>
        
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center">
              {getStatusIcon(request.status)}
              <span className="ml-2 text-sm font-medium capitalize">{request.status.toLowerCase()}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mt-2">Support Request #{request.reqId}</h2>
          </div>
          <div className="text-sm text-gray-500">
            Submitted on {new Date(request.timestamp).toLocaleDateString()}
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-gray-800 mb-2">Your Issue</h3>
          <p className="text-gray-700">{request.issueDesc}</p>
        </div>
        
        {request.cusResponse && (
          <div className="bg-violet-50 rounded-lg p-4 border border-violet-100">
            <div className="flex items-center mb-2">
              <MessageSquare className="h-5 w-5 text-violet-600 mr-2" />
              <h3 className="font-medium text-gray-800">Support Response</h3>
            </div>
            <p className="text-gray-700">{request.cusResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportRequestDetail;