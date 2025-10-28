import { useState, useEffect } from 'react';

export default function AverageBankBalance({ sectionData, saveData }) {
  const [formData, setFormData] = useState({
    average_bank_balance: '',
  });
  const [isEditing, setIsEditing] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (sectionData) {
      setFormData({
        average_bank_balance: sectionData.average_bank_balance || '',
      });
      setIsEditing(!sectionData.average_bank_balance);
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
      <h3 className="text-2xl font-bold mb-4">Average Bank Balance</h3>
      <p className="text-sm text-gray-600 mb-2">What is your average business bank balance for the last 6 months?</p>
      <p className="text-xs text-gray-500 mb-4">To calculate your average balance, add up your total monthly balance for the last six statements and divide by six.</p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Average Balance ($)</label>
          <input
            type="number"
            name="average_bank_balance"
            value={formData.average_bank_balance}
            onChange={handleChange}
            disabled={!isEditing}
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
