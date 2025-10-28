import React from 'react';

export default function Reserves() {
  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4">Reserves</h3>
      <p className="text-sm text-gray-600 mb-4">
        Apply for funding or add existing accounts to ensure your business has 10% in reserves at all times.
        90% of business owners who apply for financing do so for emergency reasons, or for an immediate business opportunity. 
        Apply for funding while you can get approved, and keep a minimum 10% of your gross monthly revenue in reserves at all times.
      </p>
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h4 className="font-semibold text-gray-800">10% of Monthly Revenue</h4>
        <p className="text-2xl font-bold text-gray-900">$ 0 of $ 0</p>
      </div>
      <div className="flex space-x-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Apply for Trade Vendors
        </button>
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
          Add Existing Accounts
        </button>
      </div>
    </div>
  );
}
