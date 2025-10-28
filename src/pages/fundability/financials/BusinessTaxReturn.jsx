import { useState, useEffect } from 'react';

export default function BusinessTaxReturn({ sectionData, saveData }) {
  const [formData, setFormData] = useState({
    filed_last_year_tax: '',
  });
  const [isEditing, setIsEditing] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (sectionData) {
      setFormData({
        filed_last_year_tax: sectionData.filed_last_year_tax || '',
      });
      setIsEditing(!sectionData.filed_last_year_tax);
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
      <h3 className="text-2xl font-bold mb-4">Business Tax Return</h3>
      <p className="text-sm text-gray-600 mb-4">Did you file last year’s business tax return? If your business tax filing is current, your financing options will likely increase and your business will be matched with certain types of lending.</p>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="filed_last_year_tax"
              value="Yes"
              checked={formData.filed_last_year_tax === 'Yes'}
              onChange={handleChange}
              disabled={!isEditing}
              className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
            />
            <span className="ml-2 text-sm text-gray-700">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="filed_last_year_tax"
              value="No"
              checked={formData.filed_last_year_tax === 'No'}
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
