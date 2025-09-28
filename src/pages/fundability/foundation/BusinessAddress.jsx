import { useState, useEffect } from "react";

export default function BusinessAddress({ foundationData, saveFoundationData }) {
  const [address, setAddress] = useState({
    business_name: "",
    address_line1: "",
    city: "",
    state: "",
    zip: "",
  });
  const [isEditing, setIsEditing] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (foundationData) {
      setAddress({
        business_name: foundationData.business_name || "",
        address_line1: foundationData.address_line1 || "",
        city: foundationData.city || "",
        state: foundationData.state || "",
        zip: foundationData.zip || "",
      });
      setIsEditing(!foundationData.business_name && !foundationData.address_line1 && !foundationData.city && !foundationData.state && !foundationData.zip);
    }
  }, [foundationData]);

  const handleChange = (e) =>
    setAddress({ ...address, [e.target.name]: e.target.value });

  const handleSave = async () => {
    const error = await saveFoundationData(address);
    if (!error) {
      setIsEditing(false);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto relative">
      {showNotification && (
        <div className="absolute top-0 left-0 right-0 bg-green-500 text-white px-4 py-2 rounded-md flex justify-between items-center">
          <span>Saved successfully!</span>
          <button onClick={() => setShowNotification(false)} className="text-white font-bold">×</button>
        </div>
      )}
      <h2 className="text-2xl font-semibold">Business Address</h2>
      <input
        className={`w-full px-3 py-2 border border-gray-300 rounded-md ${isEditing ? 'bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-100 text-gray-700'}`}
        placeholder="Business Name"
        name="business_name"
        value={address.business_name}
        onChange={handleChange}
        disabled={!isEditing}
      />
      <input
        className={`w-full px-3 py-2 border border-gray-300 rounded-md ${isEditing ? 'bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-100 text-gray-700'}`}
        placeholder="Address Line 1"
        name="address_line1"
        value={address.address_line1}
        onChange={handleChange}
        disabled={!isEditing}
      />
      <input
        className={`w-full px-3 py-2 border border-gray-300 rounded-md ${isEditing ? 'bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-100 text-gray-700'}`}
        placeholder="City"
        name="city"
        value={address.city}
        onChange={handleChange}
        disabled={!isEditing}
      />
      <input
        className={`w-full px-3 py-2 border border-gray-300 rounded-md ${isEditing ? 'bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-100 text-gray-700'}`}
        placeholder="State"
        name="state"
        value={address.state}
        onChange={handleChange}
        disabled={!isEditing}
      />
      <input
        className={`w-full px-3 py-2 border border-gray-300 rounded-md ${isEditing ? 'bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500' : 'bg-gray-100 text-gray-700'}`}
        placeholder="ZIP"
        name="zip"
        value={address.zip}
        onChange={handleChange}
        disabled={!isEditing}
      />
      <button
        onClick={isEditing ? handleSave : handleEdit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </div>
  );
} 