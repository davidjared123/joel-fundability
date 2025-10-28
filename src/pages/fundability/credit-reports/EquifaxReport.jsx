import { useState, useEffect } from 'react';

export default function EquifaxReport({ sectionData, saveData, foundationData }) {
  const [matchStatus, setMatchStatus] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (sectionData && sectionData.equifax_match_status) {
      setMatchStatus(sectionData.equifax_match_status);
    }
  }, [sectionData]);

  const handleStatusChange = async (status) => {
    await saveData({ equifax_match_status: status });
    setMatchStatus(status);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const address = foundationData ? `${foundationData.address_line1 || ''}, ${foundationData.city || ''}, ${foundationData.state || ''}, ${foundationData.zip || ''}` : 'N/A';

  return (
    <div className="p-6 relative">
      {showNotification && (
        <div className="absolute top-0 left-0 right-0 bg-green-500 text-white px-4 py-2 rounded-md flex justify-between items-center">
          <span>Saved successfully!</span>
          <button onClick={() => setShowNotification(false)} className="text-white font-bold">×</button>
        </div>
      )}
      <h3 className="text-2xl font-bold mb-4">Equifax Report</h3>
      <p className="text-sm text-gray-600 mb-4">Is your business name and address an exact match? Verify the business name and address displayed below is an exact match to what’s listed on your Equifax Report.</p>
      
      <div className="bg-gray-50 p-4 rounded-lg space-y-2 mb-6">
        <div>
          <span className="font-semibold">Business Name:</span>
          <span className="ml-2">{foundationData?.business_name || 'N/A'}</span>
        </div>
        <div>
          <span className="font-semibold">Account Address:</span>
          <span className="ml-2">{address}</span>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => handleStatusChange('Exact Match')}
          className={`px-4 py-2 rounded-md ${matchStatus === 'Exact Match' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Exact Match
        </button>
        <button
          onClick={() => handleStatusChange('Does not match')}
          className={`px-4 py-2 rounded-md ${matchStatus === 'Does not match' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Does not match
        </button>
      </div>
    </div>
  );
}
