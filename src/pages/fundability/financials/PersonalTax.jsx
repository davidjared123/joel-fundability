import { useState, useEffect } from 'react';

export default function PersonalTax({ sectionData, saveData }) {
  const [formData, setFormData] = useState({
    personal_tax_up_to_date: '',
  });
  const [isEditing, setIsEditing] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (sectionData) {
      setFormData({
        personal_tax_up_to_date: sectionData.personal_tax_up_to_date || '',
      });
      setIsEditing(!sectionData.personal_tax_up_to_date);
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
      <h3 className="text-2xl font-bold mb-4">Personal Tax Returns</h3>
      <p className="text-sm text-gray-600 mb-4">Are your personal tax returns up to date? Your business will be matched with the best financing options fit for your business, but some lenders require personal tax returns for approval.</p>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="personal_tax_up_to_date"
              value="Yes"
              checked={formData.personal_tax_up_to_date === 'Yes'}
              onChange={handleChange}
              disabled={!isEditing}
              className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
            />
            <span className="ml-2 text-sm text-gray-700">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="personal_tax_up_to_date"
              value="No"
              checked={formData.personal_tax_up_to_date === 'No'}
              onChange={handleChange}
              disabled={!isEditing}
              className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
            />
            <span className="ml-2 text-sm text-gray-700">No</span>
          </label>
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
