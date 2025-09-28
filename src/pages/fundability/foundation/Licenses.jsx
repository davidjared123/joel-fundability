import { useState, useEffect } from 'react';

export default function Licenses({ foundationData, saveFoundationData }) {
  const [formData, setFormData] = useState({
    license_type: '',
    license_number: '',
  });
  const [isEditing, setIsEditing] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (foundationData) {
      setFormData({
        license_type: foundationData.license_type || '',
        license_number: foundationData.license_number || '',
      });
      setIsEditing(!foundationData.license_type && !foundationData.license_number);
    }
  }, [foundationData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await saveFoundationData(formData);
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
      <h3 className="text-2xl font-bold mb-4">Licenses & Permits</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">License Type</label>
          <input
            type="text"
            name="license_type"
            value={formData.license_type}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="e.g., Business License"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${isEditing ? 'bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-100 text-gray-700'}`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">License Number</label>
          <input
            type="text"
            name="license_number"
            value={formData.license_number}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="License number"
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