import { useState, useEffect } from 'react';

export default function CreditReport({ sectionData, saveData }) {
  const [formData, setFormData] = useState({
    credit_report: '',
  });
  const [isEditing, setIsEditing] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (sectionData) {
      setFormData({
        credit_report: sectionData.credit_report || '',
      });
      setIsEditing(!sectionData.credit_report);
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
      <h3 className="text-2xl font-bold mb-4">Credit Report</h3>

      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Is your personal credit report from MyScoreIQ.com?
        </p>
        <p className="text-sm text-gray-500 mb-4">
          For some business loans and lines, many underwriters look at your full personal credit report. Before applying, know how to pull your full credit report from MyScoreIQ.com and perform a thorough assessment: look for any unverifiable or inaccurate information to best increase your chances of funding.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="credit_report"
              value="Yes"
              checked={formData.credit_report === 'Yes'}
              onChange={handleChange}
              disabled={!isEditing}
              className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
            />
            <span className="ml-2 text-sm text-gray-700">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="credit_report"
              value="No"
              checked={formData.credit_report === 'No'}
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