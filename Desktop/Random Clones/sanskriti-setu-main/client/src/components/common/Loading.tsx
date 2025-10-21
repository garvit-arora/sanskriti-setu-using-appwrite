import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-orange-900 mb-2">Sanskriti Setu</h2>
        <p className="text-orange-700">Connecting cultures across India...</p>
      </div>
    </div>
  );
};

export default Loading;
