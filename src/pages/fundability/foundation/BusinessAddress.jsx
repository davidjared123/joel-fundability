import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BusinessAddress() {
  const { foundationData, saveFoundationData, loading } = useOutletContext();
  const [address, setAddress] = useState({
    business_name: "",
    address_line1: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    if (foundationData) {
      setAddress({
        business_name: foundationData.business_name || "",
        address_line1: foundationData.address_line1 || "",
        city: foundationData.city || "",
        state: foundationData.state || "",
        zip: foundationData.zip || "",
      });
    }
  }, [foundationData]);

  const handleChange = (e) =>
    setAddress({ ...address, [e.target.name]: e.target.value });

  const handleSave = async () => {
    const error = await saveFoundationData(address);
    if (!error) alert("¡Guardado!");
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold">Business Address</h2>
      <input
        className="w-full p-2 border"
        placeholder="Business Name"
        name="business_name"
        value={address.business_name}
        onChange={handleChange}
      />
      <input
        className="w-full p-2 border"
        placeholder="Address Line 1"
        name="address_line1"
        value={address.address_line1}
        onChange={handleChange}
      />
      <input
        className="w-full p-2 border"
        placeholder="City"
        name="city"
        value={address.city}
        onChange={handleChange}
      />
      <input
        className="w-full p-2 border"
        placeholder="State"
        name="state"
        value={address.state}
        onChange={handleChange}
      />
      <input
        className="w-full p-2 border"
        placeholder="ZIP"
        name="zip"
        value={address.zip}
        onChange={handleChange}
      />
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
} 