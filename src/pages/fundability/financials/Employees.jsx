import { useState, useEffect } from 'react';

export default function Employees({ sectionData, saveData }) {
  const [formData, setFormData] = useState({
    w2_employees: '',
  });
  const [isEditing, setIsEditing] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (sectionData) {
      setFormData({
        w2_employees: sectionData.w2_employees || '',
      });
      setIsEditing(!sectionData.w2_employees);
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
      <h3 className="text-2xl font-bold mb-4">Employees</h3>
      <p className="text-sm text-gray-600 mb-4">How many W2 employees work on your team? Some tradeline accounts offer funding based on the number of employees in the company. NOTE: Enter the total number including you.</p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Employees</label>
          <input
            type="number"
            name="w2_employees"
            value={formData.w2_employees}
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
