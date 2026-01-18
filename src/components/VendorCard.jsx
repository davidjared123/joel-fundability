import { FiExternalLink, FiInfo, FiCheck } from 'react-icons/fi';

const VendorCard = ({ vendor, isSelected = false, onToggle, loading = false }) => {
  const {
    name,
    category,
    description,
    website,
    requirements = [],
    benefits = [],
    bureaus = [],
    isReporting = false,
    image
  } = vendor;

  const handleCheckboxChange = () => {
    if (onToggle && !loading) {
      onToggle(name, bureaus);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 ${isSelected ? 'ring-2 ring-green-500 bg-green-50' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
            {isReporting ? (
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Reporting</span>
            ) : (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Non-Reporting</span>
            )}
          </div>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
            {category}
          </span>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
        </div>

        {image && (
          <div className="ml-4">
            <img
              src={image}
              alt={name}
              className="w-16 h-16 object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      {/* Bureaus that it reports to */}
      {bureaus.length > 0 && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-700 text-sm mb-2">Reports to:</h4>
          <div className="flex flex-wrap gap-2">
            {bureaus.map((bureau, index) => (
              <span
                key={index}
                className="inline-flex items-center bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
              >
                <FiCheck className="mr-1" size={12} />
                {bureau}
              </span>
            ))}
          </div>
        </div>
      )}

      {benefits.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-2">Benefits:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center">
                <FiInfo className="text-green-500 mr-2" size={14} />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}

      {requirements.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-2">Requirements:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {requirements.map((requirement, index) => (
              <li key={index} className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                {requirement}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        {/* Checkbox para marcar si tiene cuenta */}
        <label className="flex items-center cursor-pointer group">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            disabled={loading}
            className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
          />
          <span className={`ml-2 text-sm font-medium ${isSelected ? 'text-green-700' : 'text-gray-600'} group-hover:text-green-600 transition-colors`}>
            {loading ? 'Saving...' : isSelected ? 'I have an account ✓' : 'I have an account'}
          </span>
        </label>

        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-sm"
          >
            <span>Visit Website</span>
            <FiExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );
};

export default VendorCard; 