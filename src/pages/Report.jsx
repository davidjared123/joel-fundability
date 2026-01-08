import React, { useState, useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { useFundabilityProgress } from '../hooks/useFundabilityProgress';
import { calculateFundabilityScore, generateRecommendations } from '../utils/fundabilityCalculator';
import FundabilityProgress from '../components/FundabilityProgress';

const Report = () => {
  const { progress, userData, loading, getOverallProgress } = useFundabilityProgress();
  const [fundabilityData, setFundabilityData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef(null);

  useEffect(() => {
    if (!loading && userData && Object.keys(userData).length > 0) {
      const scores = calculateFundabilityScore(userData);
      const recs = generateRecommendations(userData, scores);
      setFundabilityData(scores);
      setRecommendations(recs);
    }
  }, [userData, loading]);

  const handleExportPDF = async () => {
    if (!reportRef.current) return;

    setIsExporting(true);

    const element = reportRef.current;
    const businessName = userData?.foundation?.business_name || 'Business';

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `Fundability_Report_${businessName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

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

  const getTierLabel = (percentage) => {
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 60) return 'Good';
    if (percentage >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  const formatCategoryName = (name) => {
    const names = {
      foundation: 'Foundation',
      financials: 'Financials',
      businessCredit: 'Business Credit',
      personal: 'Personal Credit',
      applicationProcess: 'Application Process'
    };
    return names[name] || name.replace(/([A-Z])/g, ' $1').trim();
  };

  const creditScore = parseInt(userData?.personal?.credit_score) || 0;
  const paydexScore = parseInt(userData?.businessCredit?.paydex_score) || 0;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {/* Export Button */}
      <div className="max-w-6xl mx-auto px-4 mb-4">
        <div className="flex justify-end">
          <button
            className={`${isExporting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center`}
            onClick={handleExportPDF}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Generating PDF...
              </>
            ) : (
              <>
                <span className="mr-2">📄</span>
                Export Report as PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Report Content */}
      <div ref={reportRef} className="max-w-6xl mx-auto px-4" id="report-content">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Credit Readiness Report</h1>
              <p className="text-gray-600">Your personalized credit fundability assessment</p>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p><strong>Business:</strong> {userData?.foundation?.business_name || 'N/A'}</p>
              <p><strong>Generated:</strong> {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
            </div>
          </div>
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
              {getTierLabel(fundabilityData.overallPercentage)}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Based on your completed information, here's your current credit readiness assessment.
            </p>
          </div>
        </div>

        {/* SBA Eligibility */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">SBA Loan Eligibility</h3>

          {/* User's Current Scores */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="text-sm font-medium text-blue-600">Your Personal Credit Score</div>
              <div className="text-3xl font-bold text-blue-800">
                {userData?.personal?.credit_score || '—'}
              </div>
              {!userData?.personal?.credit_score && (
                <div className="text-xs text-blue-500 mt-1">Enter your credit score to see eligibility</div>
              )}
            </div>
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <div className="text-sm font-medium text-purple-600">Your PAYDEX Score</div>
              <div className="text-3xl font-bold text-purple-800">
                {userData?.businessCredit?.paydex_score || '—'}
              </div>
              {!userData?.businessCredit?.paydex_score && (
                <div className="text-xs text-purple-500 mt-1">Enter your PAYDEX score in Business Credit</div>
              )}
            </div>
          </div>

          {/* SBA Loan Types */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* SBA 7(a) */}
            <div className={`p-4 rounded-lg border-2 ${creditScore >= 680 ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-200'}`}>
              <div className="text-sm font-medium text-gray-700">SBA 7(a)</div>
              <div className={`text-lg font-bold ${creditScore >= 680 ? 'text-green-600' : 'text-red-600'}`}>
                {creditScore >= 680 ? '✓ Eligible' : '✗ Not Eligible'}
              </div>
              <div className="text-xs text-gray-500 mt-1">Requires: 680+</div>
              {creditScore > 0 && creditScore < 680 && (
                <div className="text-xs font-medium text-red-600 mt-1">
                  Need {680 - creditScore} more points
                </div>
              )}
            </div>

            {/* SBA 504 */}
            <div className={`p-4 rounded-lg border-2 ${creditScore >= 680 ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-200'}`}>
              <div className="text-sm font-medium text-gray-700">SBA 504</div>
              <div className={`text-lg font-bold ${creditScore >= 680 ? 'text-green-600' : 'text-red-600'}`}>
                {creditScore >= 680 ? '✓ Eligible' : '✗ Not Eligible'}
              </div>
              <div className="text-xs text-gray-500 mt-1">Requires: 680+</div>
              {creditScore > 0 && creditScore < 680 && (
                <div className="text-xs font-medium text-red-600 mt-1">
                  Need {680 - creditScore} more points
                </div>
              )}
            </div>

            {/* SBA Express */}
            <div className={`p-4 rounded-lg border-2 ${creditScore >= 650 ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-200'}`}>
              <div className="text-sm font-medium text-gray-700">SBA Express</div>
              <div className={`text-lg font-bold ${creditScore >= 650 ? 'text-green-600' : 'text-red-600'}`}>
                {creditScore >= 650 ? '✓ Eligible' : '✗ Not Eligible'}
              </div>
              <div className="text-xs text-gray-500 mt-1">Requires: 650+</div>
              {creditScore > 0 && creditScore < 650 && (
                <div className="text-xs font-medium text-red-600 mt-1">
                  Need {650 - creditScore} more points
                </div>
              )}
            </div>

            {/* SBA Microloan */}
            <div className={`p-4 rounded-lg border-2 ${creditScore >= 620 ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-200'}`}>
              <div className="text-sm font-medium text-gray-700">SBA Microloan</div>
              <div className={`text-lg font-bold ${creditScore >= 620 ? 'text-green-600' : 'text-red-600'}`}>
                {creditScore >= 620 ? '✓ Eligible' : '✗ Not Eligible'}
              </div>
              <div className="text-xs text-gray-500 mt-1">Requires: 620+</div>
              {creditScore > 0 && creditScore < 620 && (
                <div className="text-xs font-medium text-red-600 mt-1">
                  Need {620 - creditScore} more points
                </div>
              )}
            </div>
          </div>

          {/* PAYDEX Recommendation */}
          {paydexScore > 0 && paydexScore < 80 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-sm text-yellow-800">
                <strong>💡 Tip:</strong> Your PAYDEX score of {paydexScore} is below 80.
                Aim for 80+ by paying vendors early. Need {80 - paydexScore} more points.
              </div>
            </div>
          )}
        </div>

        {/* Progress Overview */}
        <FundabilityProgress progress={progress} overallPercentage={getOverallProgress()} />

        {/* Category Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-2">Fundability Scores by Category</h3>
          <p className="text-sm text-gray-600 mb-4">Quality Assessment - How attractive your information is to lenders</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(fundabilityData.percentages).map(([category, percentage]) => (
              <div key={category} className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {formatCategoryName(category)}
                </h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
                  <span className={`text-sm font-medium ${getScoreColor(percentage)}`}>
                    {percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Good' : 'Needs Work'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${percentage >= 80 ? 'bg-green-500' :
                        percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {fundabilityData.categoryScores[category].toFixed(1)} / {
                    category === 'personal' ? '15' :
                      category === 'applicationProcess' ? '10' : '25'
                  } points
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        {recommendations && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
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

        {/* Information Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Information Summary</h3>
          <p className="text-sm text-gray-600 mb-4">Data collected for your credit application</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Foundation Info */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 border-b pb-1">Business Foundation</h4>
              <ul className="text-sm space-y-1">
                <li><span className="text-gray-500">Business Name:</span> {userData?.foundation?.business_name || 'N/A'}</li>
                <li><span className="text-gray-500">Entity Type:</span> {userData?.foundation?.entity_type || 'N/A'}</li>
                <li><span className="text-gray-500">EIN:</span> {userData?.foundation?.ein_number ? '✓ Registered' : '✗ Missing'}</li>
                <li><span className="text-gray-500">Address:</span> {userData?.foundation?.address_line1 ? '✓ Complete' : '✗ Missing'}</li>
                <li><span className="text-gray-500">Website:</span> {userData?.foundation?.website || 'N/A'}</li>
              </ul>
            </div>

            {/* Financial Info */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 border-b pb-1">Financial Status</h4>
              <ul className="text-sm space-y-1">
                <li><span className="text-gray-500">Bank Account:</span> {userData?.financials?.bank_name || 'N/A'}</li>
                <li><span className="text-gray-500">Avg Balance:</span> ${userData?.financials?.average_bank_balance?.toLocaleString() || 'N/A'}</li>
                <li><span className="text-gray-500">Tax Returns:</span> {userData?.financials?.filed_last_year_tax === 'Yes' || userData?.financials?.filed_last_year_tax === true ? '✓ Filed' : '✗ Not filed'}</li>
                <li><span className="text-gray-500">Revenue:</span> {userData?.financials?.has_revenue === 'Yes' || userData?.financials?.has_revenue === true ? '✓ Yes' : '✗ No'}</li>
              </ul>
            </div>

            {/* Credit Info */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2 border-b pb-1">Credit Profile</h4>
              <ul className="text-sm space-y-1">
                <li><span className="text-gray-500">Personal Credit:</span> {userData?.personal?.credit_score || 'N/A'}</li>
                <li><span className="text-gray-500">PAYDEX:</span> {userData?.businessCredit?.paydex_score || 'N/A'}</li>
                <li><span className="text-gray-500">D&B:</span> {userData?.businessCredit?.dnb_report ? '✓ Registered' : '✗ Not registered'}</li>
                <li><span className="text-gray-500">Negative Records:</span> {userData?.personal?.bankruptcies_liens_judgements === 'No' ? '✓ None' : '⚠️ Present'}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 py-4">
          <p>This report is a fundability assessment based on the information provided.</p>
          <p>It does not guarantee loan approval. Actual lending decisions are made by financial institutions.</p>
          <p className="mt-2">Generated on {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>
      </div>
    </div>
  );
};

export default Report;