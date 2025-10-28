import { useState, useEffect } from 'react';

export default function PersonalCreditScore({ sectionData, saveData }) {
  const [formData, setFormData] = useState({
    credit_score: '',
  });
  const [isEditing, setIsEditing] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (sectionData) {
      setFormData({
        credit_score: sectionData.credit_score || '',
      });
      setIsEditing(!sectionData.credit_score);
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
      <h3 className="text-2xl font-bold mb-4">Personal Credit Score</h3>

      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          What's the highest personal credit score available to secure business funding?
        </p>
        <p className="text-sm text-gray-500 mb-4">
          If your business has multiple owners, enter the highest personal credit score of any business owner willing to use his/her personal credit to increase Fundability and obtain business financing (ie. credit cards, lines, loans). Any owner supplying personal credit to secure business funding must own at least 20% of the business.
        </p>
        <button className="text-blue-600 hover:text-blue-800 underline text-sm mb-4">
          Click here if you do not know your credit score.
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Personal Credit Score</label>
          <input
            type="number"
            name="credit_score"
            value={formData.credit_score}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Enter your credit score"
            min="300"
            max="850"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${isEditing ? 'bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-100 text-gray-700'}`}
          />
        </div>
        <button
          onClick={isEditing ? handleSave : handleEdit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
    </div>
  );
}