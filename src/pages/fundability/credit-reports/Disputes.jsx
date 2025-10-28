import React from 'react';

export default function Disputes() {
  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4">Disputes</h3>
      <p className="text-sm text-gray-600 mb-4">
        Congratulations! There are no items to be disputed. To review your reports and verify you are not seeing any negative items currently reporting, click Bureau Insights on the left-side panel. If you do not have any derogatory items to dispute, click next.
      </p>

      <div className="flex space-x-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          File a Dispute
        </button>
      </div>
    </div>
  );
}
