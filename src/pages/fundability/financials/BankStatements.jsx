import { useState, useEffect } from 'react';
import { FiCheck, FiX, FiInfo } from 'react-icons/fi';

export default function BankStatements({ sectionData, saveData }) {
  const [formData, setFormData] = useState({
    bank_statements_info: '',
    has_6_months_statements: null,
  });
  const [showNotification, setShowNotification] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (sectionData) {
      setFormData({
        bank_statements_info: sectionData.bank_statements_info || '',
        has_6_months_statements: sectionData.has_6_months_statements,
      });
    }
  }, [sectionData]);

  const handleSelection = async (value) => {
    setSaving(true);
    const newFormData = {
      ...formData,
      has_6_months_statements: value,
      bank_statements_info: value ? '6+ months available' : 'Less than 6 months'
    };
    setFormData(newFormData);

    await saveData(newFormData);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
    setSaving(false);
  };

  return (
    <div className="p-6 relative">
      {showNotification && (
        <div className="absolute top-0 left-0 right-0 bg-green-500 text-white px-4 py-2 rounded-md flex justify-between items-center z-10">
          <span>Saved successfully!</span>
          <button onClick={() => setShowNotification(false)} className="text-white font-bold">×</button>
        </div>
      )}

      <h3 className="text-2xl font-bold mb-4">Bank Statements</h3>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <FiInfo className="text-blue-600 mt-1 mr-3 flex-shrink-0" size={20} />
          <div>
            <p className="text-sm text-blue-800">
              Most lenders require at least 6 months of bank statements to verify your business cash flow and financial health. Having 6+ months of statements significantly improves your fundability.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-800 mb-4">
            Do you have 6 or more months of business bank statements?
          </label>

          <div className="grid grid-cols-2 gap-4 max-w-md">
            {/* YES Option */}
            <button
              onClick={() => handleSelection(true)}
              disabled={saving}
              className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center justify-center ${formData.has_6_months_statements === true
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-green-300 hover:bg-green-50'
                }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${formData.has_6_months_statements === true ? 'bg-green-500 text-white' : 'bg-gray-100'
                }`}>
                <FiCheck size={24} />
              </div>
              <span className="font-semibold text-lg">Yes</span>
              <span className="text-xs text-gray-500 mt-1">6+ months available</span>
            </button>

            {/* NO Option */}
            <button
              onClick={() => handleSelection(false)}
              disabled={saving}
              className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center justify-center ${formData.has_6_months_statements === false
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-red-300 hover:bg-red-50'
                }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${formData.has_6_months_statements === false ? 'bg-red-500 text-white' : 'bg-gray-100'
                }`}>
                <FiX size={24} />
              </div>
              <span className="font-semibold text-lg">No</span>
              <span className="text-xs text-gray-500 mt-1">Less than 6 months</span>
            </button>
          </div>
        </div>

        {/* Status indicator */}
        {formData.has_6_months_statements !== null && (
          <div className={`p-4 rounded-lg ${formData.has_6_months_statements
              ? 'bg-green-50 border border-green-200'
              : 'bg-yellow-50 border border-yellow-200'
            }`}>
            {formData.has_6_months_statements ? (
              <div className="flex items-center text-green-700">
                <FiCheck className="mr-2" />
                <span className="font-medium">Great! Having 6+ months of statements adds points to your fundability score.</span>
              </div>
            ) : (
              <div className="text-yellow-700">
                <p className="font-medium mb-2">Recommendation:</p>
                <p className="text-sm">
                  Start collecting your monthly bank statements. After 6 months, update this section to improve your fundability score. Most lenders require this documentation for loan approval.
                </p>
              </div>
            )}
          </div>
        )}

        {saving && (
          <p className="text-sm text-gray-500">Saving...</p>
        )}
      </div>
    </div>
  );
}
