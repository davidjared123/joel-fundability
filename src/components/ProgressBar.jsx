const ProgressBar = ({ completed, total, showPercentage = true }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Progress: {completed} of {total} completed
        </span>
        {showPercentage && (
          <span className="text-sm font-medium text-gray-700">
            {percentage}%
          </span>
        )}
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      {percentage === 100 && (
        <div className="mt-2 text-center">
          <span className="text-sm text-green-600 font-medium">
            🎉 Section completed!
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar; 