import { useState, useEffect } from 'react';

export default function ExperianData({ sectionData, saveData, foundationData }) {
  const [isCorrect, setIsCorrect] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (sectionData && sectionData.experian_info_correct !== undefined) {
      setIsCorrect(sectionData.experian_info_correct);
    }
  }, [sectionData]);

  const handleToggle = async () => {
    const newValue = !isCorrect;
    await saveData({ experian_info_correct: newValue });
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
      <h3 className="text-2xl font-bold mb-4">Experian Data</h3>
      
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

      <div>
        {isCorrect ? (
          <div className="flex items-center">
            <span className="text-green-600 font-semibold">✓ This info Is Correct</span>
            <button onClick={handleToggle} className="ml-4 text-sm text-blue-600 hover:underline">Click here if this info is not correct.</button>
          </div>
        ) : (
          <div className="flex items-center">
            <span className="text-red-600 font-semibold">✗ This info Is Incorrect</span>
            <button onClick={handleToggle} className="ml-4 text-sm text-blue-600 hover:underline">Click here if this info is correct.</button>
          </div>
        )}
      </div>
    </div>
  );
}
