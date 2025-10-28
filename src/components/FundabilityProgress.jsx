import React from 'react';

const FundabilityProgress = ({ progress, overallPercentage }) => {
  const categories = [
    { key: 'foundation', label: 'Foundation', color: 'bg-blue-500' },
    { key: 'financials', label: 'Financials', color: 'bg-green-500' },
    { key: 'businessCredit', label: 'Business Credit', color: 'bg-purple-500' },
    { key: 'personal', label: 'Personal', color: 'bg-orange-500' },
    { key: 'applicationProcess', label: 'Application Process', color: 'bg-red-500' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-semibold mb-2">Overall Progress</h3>
      <p className="text-sm text-gray-600 mb-4">Completion Progress - Steps completed out of total required</p>

      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Total Completion</span>
          <span className="text-sm font-medium">{overallPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${overallPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Category Progress Bars */}
      <div className="space-y-3">
        {categories.map((category) => {
          const sectionProgress = progress[category.key];
          const percentage = sectionProgress ? Math.round((sectionProgress.completed / sectionProgress.total) * 100) : 0;

          return (
            <div key={category.key}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{category.label}</span>
                <span className="text-sm text-gray-600">
                  {sectionProgress?.completed || 0} / {sectionProgress?.total || 0} ({percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${category.color} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FundabilityProgress;