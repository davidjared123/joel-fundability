import { useState, useEffect } from 'react';

export default function ChexSystems({ sectionData, saveData }) {
  const [formData, setFormData] = useState({
    chex_systems: '',
  });
  const [isEditing, setIsEditing] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (sectionData) {
      setFormData({
        chex_systems: sectionData.chex_systems || '',
      });
      setIsEditing(!sectionData.chex_systems);
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
      <h3 className="text-2xl font-bold mb-4">Chex Systems</h3>

      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Do you have your ChexSystems report?
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Many underwriters look at your ChexSystems report to inform their decision. Before applying, know how to pull your ChexSystems report and perform a thorough assessment to best increase your chances of funding.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <a
            href="#"
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center hover:bg-blue-100 transition-colors"
          >
            <div className="text-blue-600 font-medium">Get your ChexSystems Report</div>
          </a>
          <a
            href="#"
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center hover:bg-blue-100 transition-colors"
          >
            <div className="text-blue-600 font-medium">Get your ChexSystems Score</div>
          </a>
          <a
            href="#"
            className="bg-green-50 border border-green-200 rounded-lg p-4 text-center hover:bg-green-100 transition-colors"
          >
            <div className="text-green-600 font-medium">Add a Security Freeze to Your ChexSystems Report</div>
          </a>
          <a
            href="#"
            className="bg-green-50 border border-green-200 rounded-lg p-4 text-center hover:bg-green-100 transition-colors"
          >
            <div className="text-green-600 font-medium">Lift a Security Freeze from Your ChexSystems Report</div>
          </a>
        </div>

        <div className="mb-4">
          <a
            href="#"
            className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center block hover:bg-orange-100 transition-colors"
          >
            <div className="text-orange-600 font-medium">Dispute your ChexSystems Reports</div>
          </a>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="chex_systems"
              value="Yes"
              checked={formData.chex_systems === 'Yes'}
              onChange={handleChange}
              disabled={!isEditing}
              className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
            />
            <span className="ml-2 text-sm text-gray-700">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="chex_systems"
              value="No"
              checked={formData.chex_systems === 'No'}
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