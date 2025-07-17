import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const ExpandableItem = ({ title, description, details, icon }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="text-blue-600">
              {icon}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
        </div>
        
        <div className="text-gray-400">
          {isExpanded ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-200">
          <div className="pt-4 text-sm text-gray-700 space-y-3">
            {Array.isArray(details) ? (
              <ul className="space-y-2">
                {details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div>{details}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandableItem; 