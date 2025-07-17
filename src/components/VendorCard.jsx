import { FiExternalLink, FiInfo } from 'react-icons/fi';

const VendorCard = ({ vendor }) => {
  const {
    name,
    category,
    description,
    website,
    requirements = [],
    benefits = [],
    image
  } = vendor;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
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
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          Learn More
        </button>
        
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