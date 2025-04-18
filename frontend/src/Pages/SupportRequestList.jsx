import React from 'react';
import { HelpCircle, Clock, CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SupportRequestsList = ({ requests }) => {
  const navigate = useNavigate();

  const getStatusIcon = (status) => {
    switch(status) {
      case 'OPEN':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'RESOLVED':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'CANCELLED':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <HelpCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <HelpCircle className="mr-2 text-violet-600" />
        My Support Requests
      </h3>
      
      {requests.length === 0 ? (
        <div className="bg-violet-50 border border-violet-200 rounded-lg p-6 text-center">
          <p className="text-violet-700">You haven't submitted any support requests yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((request) => (
            <div 
              key={request.reqId} 
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:border-violet-200 cursor-pointer transition-colors"
              onClick={() => navigate(`/support/${request.reqId}`)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center mb-1">
                    {getStatusIcon(request.status)}
                    <span className="ml-2 text-sm font-medium capitalize">{request.status.toLowerCase()}</span>
                  </div>
                  <h4 className="text-gray-800 font-medium line-clamp-1">{request.issueDesc}</h4>
                </div>
                <ChevronRight className="text-gray-400" />
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Submitted on {new Date(request.timestamp).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupportRequestsList;