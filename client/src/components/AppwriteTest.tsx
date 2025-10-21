import React from 'react';
import { account } from '../lib/appwrite';

const AppwriteTest: React.FC = () => {
  const testConnection = async () => {
    try {
      console.log('Testing Appwrite connection...');
      const response = await account.get();
      console.log('Connection successful:', response);
      alert('Appwrite connection successful!');
    } catch (error: any) {
      console.error('Connection failed:', error);
      alert(`Connection failed: ${error.message}`);
    }
  };

  return (
    <div className="p-4">
      <button 
        onClick={testConnection}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Test Appwrite Connection
      </button>
      <p className="mt-2 text-sm text-gray-600">
        This will test the connection to Appwrite. Check console for details.
      </p>
    </div>
  );
};

export default AppwriteTest;