import { useState, useEffect } from 'react';

export default function PaydexScore({ sectionData, saveData }) {
  const [formData, setFormData] = useState({
    paydex_score: '',
  });
  const [isEditing, setIsEditing] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (sectionData) {
      setFormData({
        paydex_score: sectionData.paydex_score || '',
      });
      setIsEditing(!sectionData.paydex_score);
    }
  }, [sectionData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await saveData(formData);
    setIsEditing(false);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="p-6 relative">
      {showNotification && (
        <div className="absolute top-0 left-0 right-0 bg-green-500 text-white px-4 py-2 rounded-md flex justify-between items-center">
          <span>Saved successfully!</span>
          <button onClick={() => setShowNotification(false)} className="text-white font-bold">×</button>
        </div>
      )}
      <h3 className="text-2xl font-bold mb-4">Improve your Paydex score</h3>
      <p className="text-sm text-gray-600 mb-4">
        A Paydex Score below 80 indicates that your business has recorded late payments on its credit report. A score below 80 could potentially impact approval decisions or the terms offered. To enhance your score, ensure all bills are paid on time.
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Business Credit Bureaus have their own fees for monitoring your credit with them. A simpler and less costly way to view your business credit data is through Bureau Insights which seamlessly integrates in Fundability, granting you the ability to access lender reports and review business credit information. Check out Bureau Insights here.
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Paydex Score</label>
          <input
            type="number"
            name="paydex_score"
            value={formData.paydex_score}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${isEditing ? 'bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-100 text-gray-700'}`}
          />
        </div>
        <button
          onClick={isEditing ? handleSave : handleEdit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEditing ? 'Update Paydex Score' : 'Edit'}
        </button>
      </div>
    </div>
  );
}
