import { useState, useEffect } from 'react';

export default function BusinessName({ foundationData, saveFoundationData }) {
  const [formData, setFormData] = useState({
    business_name: '',
    entity_type: '',
    formation_date: '',
  });
  const [isEditing, setIsEditing] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (foundationData) {
      setFormData({
        business_name: foundationData.business_name || '',
        entity_type: foundationData.entity_type || '',
        formation_date: foundationData.formation_date || '',
      });
      // Si hay datos, mostrar en readonly
      setIsEditing(!foundationData.business_name && !foundationData.entity_type && !foundationData.formation_date);
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
      <h3 className="text-2xl font-bold mb-4">Business Name & Entity Setup</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Business Name</label>
          <input
            type="text"
            name="business_name"
            value={formData.business_name}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${isEditing ? 'bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-100 text-gray-700'}`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Entity Type</label>
          <select
            name="entity_type"
            value={formData.entity_type}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${isEditing ? 'bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-100 text-gray-700'}`}
          >
            <option value="">Select Entity Type</option>
            <option value="LLC">LLC</option>
            <option value="Corporation">Corporation</option>
            <option value="Partnership">Partnership</option>
            <option value="Sole Proprietorship">Sole Proprietorship</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Formation Date</label>
          <input
            type="date"
            name="formation_date"
            value={formData.formation_date}
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