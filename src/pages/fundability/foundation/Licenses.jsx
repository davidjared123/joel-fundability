import { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiCheck } from 'react-icons/fi';

export default function Licenses({ foundationData, saveFoundationData }) {
  const [licenses, setLicenses] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [saving, setSaving] = useState(false);

  // Parse licenses from foundationData on mount
  useEffect(() => {
    if (foundationData) {
      // Try to parse licenses_data as JSON array, fallback to legacy format
      if (foundationData.licenses_data) {
        try {
          const parsed = typeof foundationData.licenses_data === 'string'
            ? JSON.parse(foundationData.licenses_data)
            : foundationData.licenses_data;
          if (Array.isArray(parsed)) {
            setLicenses(parsed);
            return;
          }
        } catch (e) {
          console.log('Could not parse licenses_data, using legacy format');
        }
      }

      // Legacy format: single license_type and license_number
      if (foundationData.license_type || foundationData.license_number) {
        setLicenses([{
          id: Date.now(),
          name: 'Primary License',
          type: foundationData.license_type || '',
          number: foundationData.license_number || '',
          isEditing: false
        }]);
      }
    }
  }, [foundationData]);

  const addLicense = () => {
    setLicenses(prev => [...prev, {
      id: Date.now(),
      name: '',
      type: '',
      number: '',
      isEditing: true
    }]);
  };

  const removeLicense = async (id) => {
    const updated = licenses.filter(l => l.id !== id);
    setLicenses(updated);
    await saveAllLicenses(updated);
  };

  const updateLicense = (id, field, value) => {
    setLicenses(prev => prev.map(l =>
      l.id === id ? { ...l, [field]: value } : l
    ));
  };

  const toggleEdit = (id) => {
    setLicenses(prev => prev.map(l =>
      l.id === id ? { ...l, isEditing: !l.isEditing } : l
    ));
  };

  const saveAllLicenses = async (licensesToSave = licenses) => {
    setSaving(true);

    // Prepare data: save as JSON and also keep first license in legacy fields for compatibility
    const firstLicense = licensesToSave[0] || {};

    await saveFoundationData({
      license_type: firstLicense.type || '',
      license_number: firstLicense.number || '',
      licenses_data: JSON.stringify(licensesToSave.map(l => ({
        id: l.id,
        name: l.name,
        type: l.type,
        number: l.number
      })))
    });

    // Mark all as not editing
    setLicenses(prev => prev.map(l => ({ ...l, isEditing: false })));

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
    setSaving(false);
  };

  const saveSingleLicense = async (id) => {
    toggleEdit(id);
    await saveAllLicenses();
  };

  return (
    <div className="p-6 relative">
      {showNotification && (
        <div className="absolute top-0 left-0 right-0 bg-green-500 text-white px-4 py-2 rounded-md flex justify-between items-center z-10">
          <span>Saved successfully!</span>
          <button onClick={() => setShowNotification(false)} className="text-white font-bold">×</button>
        </div>
      )}

      <h3 className="text-2xl font-bold mb-2">Licenses & Permits</h3>
      <p className="text-sm text-gray-600 mb-6">
        Add all your business licenses and permits. Having proper licensing improves your fundability.
      </p>

      <div className="space-y-4">
        {licenses.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-gray-500 mb-4">No licenses added yet.</p>
            <button
              onClick={addLicense}
              className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="mr-2" />
              Add Your First License
            </button>
          </div>
        ) : (
          <>
            {licenses.map((license, index) => (
              <div
                key={license.id}
                className={`border rounded-lg p-4 ${license.isEditing ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white'}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-medium text-gray-500">License #{index + 1}</span>
                  <div className="flex space-x-2">
                    {license.isEditing ? (
                      <button
                        onClick={() => saveSingleLicense(license.id)}
                        disabled={saving}
                        className="text-green-600 hover:text-green-700 p-1"
                        title="Save"
                      >
                        <FiCheck size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleEdit(license.id)}
                        className="text-blue-600 hover:text-blue-700 p-1"
                        title="Edit"
                      >
                        <FiEdit2 size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => removeLicense(license.id)}
                      className="text-red-500 hover:text-red-600 p-1"
                      title="Remove"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Name</label>
                    <input
                      type="text"
                      value={license.name}
                      onChange={(e) => updateLicense(license.id, 'name', e.target.value)}
                      disabled={!license.isEditing}
                      placeholder="e.g., City Business License"
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md ${license.isEditing
                          ? 'bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500'
                          : 'bg-gray-100 text-gray-700'
                        }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Type</label>
                    <input
                      type="text"
                      value={license.type}
                      onChange={(e) => updateLicense(license.id, 'type', e.target.value)}
                      disabled={!license.isEditing}
                      placeholder="e.g., Business License"
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md ${license.isEditing
                          ? 'bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500'
                          : 'bg-gray-100 text-gray-700'
                        }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                    <input
                      type="text"
                      value={license.number}
                      onChange={(e) => updateLicense(license.id, 'number', e.target.value)}
                      disabled={!license.isEditing}
                      placeholder="License number"
                      className={`w-full px-3 py-2 border border-gray-300 rounded-md ${license.isEditing
                          ? 'bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500'
                          : 'bg-gray-100 text-gray-700'
                        }`}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Add another license button */}
            <button
              onClick={addLicense}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center"
            >
              <FiPlus className="mr-2" />
              Add Another License
            </button>
          </>
        )}
      </div>

      {saving && (
        <p className="text-sm text-gray-500 mt-4">Saving...</p>
      )}
    </div>
  );
}