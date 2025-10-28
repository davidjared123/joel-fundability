import React from 'react';

export default function TradelinesReporting() {
  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4">Tradelines Reporting</h3>
      <p className="text-sm text-gray-600 mb-4">
        First, you will need to generate your business credit report once each month. Next, you will use the Funding Manager to verify your existing accounts/tradelines line up with what's on your monthly report (and all information is accurate). You will also use the Funding Manager to apply for new accounts. NOTE: Using the Funding Manager ensures that all existing accounts you have, and will apply for, will report your payment activities accurately.
      </p>

      <div className="flex space-x-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Apply for Accounts
        </button>
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
          Add Existing Accounts
        </button>
      </div>
    </div>
  );
}
