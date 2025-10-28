import React, { useState, useEffect } from 'react';
import { useFundabilityProgress } from '../hooks/useFundabilityProgress';
import { calculateFundabilityScore, generateRecommendations } from '../utils/fundabilityCalculator';
import FundabilityProgress from '../components/FundabilityProgress';

const Report = () => {
  const { progress, userData, loading, getOverallProgress } = useFundabilityProgress();
  const [fundabilityData, setFundabilityData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    if (!loading && userData && Object.keys(userData).length > 0) {
      const scores = calculateFundabilityScore(userData);
      const recs = generateRecommendations(userData, scores);
      setFundabilityData(scores);
      setRecommendations(recs);
    }
  }, [userData, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Generating your credit readiness report...</p>
        </div>
      </div>
    );
  }

  if (!fundabilityData) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Credit Readiness Report</h2>
            <p className="text-gray-600 mb-4">Complete more steps to generate your personalized report.</p>
            <FundabilityProgress progress={progress} overallPercentage={getOverallProgress()} />
          </div>
        </div>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Credit Readiness Report</h1>
          <p className="text-gray-600">Your personalized credit fundability assessment</p>
        </div>

        {/* Overall Score */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreBgColor(fundabilityData.overallPercentage)} mb-4`}>
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(fundabilityData.overallPercentage)}`}>
                  {fundabilityData.overallPercentage}%
                </div>
                <div className="text-sm text-gray-600">Fundability Score</div>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {fundabilityData.overallPercentage >= 80 ? 'Excellent' :
               fundabilityData.overallPercentage >= 60 ? 'Good' :
               fundabilityData.overallPercentage >= 40 ? 'Fair' : 'Needs Improvement'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Based on your completed information, here's your current credit readiness assessment.
              Continue completing steps to improve your score.
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        <FundabilityProgress progress={progress} overallPercentage={getOverallProgress()} />

        {/* Category Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-2">Fundability Scores</h3>
          <p className="text-sm text-gray-600 mb-4">Quality Assessment - How attractive your information is to lenders</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(fundabilityData.percentages).map(([category, percentage]) => (
              <div key={category} className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2 capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
                <span className={`text-sm font-medium ${getScoreColor(percentage)}`}>
                  {percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Good' : 'Needs Work'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    percentage >= 80 ? 'bg-green-500' :
                    percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Recommendations */}
        {recommendations && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                <span className="mr-2">✅</span> Strengths
              </h3>
              {recommendations.strengths.length > 0 ? (
                <ul className="space-y-2">
                  {recommendations.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">Complete more steps to identify your strengths.</p>
              )}
            </div>

            {/* Areas for Improvement */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-orange-800 mb-4 flex items-center">
                <span className="mr-2">⚠️</span> Areas for Improvement
              </h3>
              {recommendations.weaknesses.length > 0 ? (
                <ul className="space-y-2">
                  {recommendations.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      <span className="text-gray-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">Great job! No major areas need improvement.</p>
              )}
            </div>

            {/* Actionable Suggestions */}
            <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
              <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                <span className="mr-2">💡</span> Actionable Suggestions
              </h3>
              {recommendations.suggestions.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {recommendations.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{suggestion}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">You're on the right track! Keep up the good work.</p>
              )}
            </div>
          </div>
        )}

        {/* Export Button */}
        <div className="mt-8 text-center">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center mx-auto"
            onClick={() => {
              // TODO: Implement PDF export functionality
              alert('PDF export functionality will be implemented soon!');
            }}
          >
            <span className="mr-2">📄</span>
            Export Report as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Report;