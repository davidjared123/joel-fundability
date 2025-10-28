import { useState, useEffect } from 'react';

export default function DNBReport({ sectionData, saveData, foundationData }) {
  const [isCorrect, setIsCorrect] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (sectionData && sectionData.dnb_report !== undefined) {
      setIsCorrect(sectionData.dnb_report === 'correct');
    }
  }, [sectionData]);

  const handleToggle = async () => {
    const newValue = !isCorrect;
    await saveData({ dnb_report: newValue ? 'correct' : 'incorrect' });
    setIsCorrect(newValue);
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
      <h3 className="text-2xl font-bold mb-4">D&B Report</h3>
      <p className="text-sm text-gray-600 mb-4">
        Just like personal credit reports, your information may be reporting incorrectly on your business credit reports. We did not find any errors reporting at this time. Click “My Info Is Incorrect” if you spot an error in your info below.
      </p>
      <p className="text-sm text-gray-600 mb-4">
        By the way, here is a quick link to log into your D&B Account: <a href="https://my.dnb.com/login" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://my.dnb.com/login</a>
      </p>
      
      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
        <div>
          <span className="font-semibold">DUNS Number:</span>
          <span className="ml-2">{foundationData?.duns_number || 'N/A'}</span>
        </div>
        <div>
          <span className="font-semibold">Business Name:</span>
          <span className="ml-2">{foundationData?.business_name || 'N/A'}</span>
        </div>
        <div>
          <span className="font-semibold">Account Address:</span>
          <span className="ml-2">{address}</span>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleToggle}
          className={`${isCorrect ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-2 rounded-md hover:opacity-90`}
        >
          {isCorrect ? '✓ My Info Is Correct' : 'My Info Is Incorrect'}
        </button>
      </div>
    </div>
  );
}
