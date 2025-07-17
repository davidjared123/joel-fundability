import { useState } from 'react';
import StepCard from '../../components/StepCard';
import ProgressBar from '../../components/ProgressBar';

const CreditReports = () => {
  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    {
      title: "D&B Report",
      description: "Establish your Dun & Bradstreet business credit profile",
      details: "Dun & Bradstreet is the most important business credit bureau. You need to establish a D-U-N-S number and build your Paydex score.",
      status: completedSteps.includes('d-b-report') ? 'completed' : 'pending'
    },
    {
      title: "Experian Data",
      description: "Monitor your Experian business credit data",
      details: "Experian tracks business credit information including payment history, credit limits, and account balances.",
      status: completedSteps.includes('experian-data') ? 'completed' : 'pending'
    },
    {
      title: "Equifax Reports",
      description: "Review your Equifax business credit reports",
      details: "Equifax provides business credit reports and scores. Monitor your account regularly for accuracy.",
      status: completedSteps.includes('equifax-reports') ? 'completed' : 'pending'
    },
    {
      title: "Bureau Distribution",
      description: "Ensure your accounts report to all major bureaus",
      details: "Not all vendors report to all credit bureaus. Focus on vendors that report to D&B, Experian, and Equifax.",
      status: completedSteps.includes('bureau-distribution') ? 'completed' : 'pending'
    },
    {
      title: "Tradelines Reporting",
      description: "Build tradelines that report to business credit bureaus",
      details: "Tradelines are credit accounts that appear on your business credit report. Focus on accounts that report to major bureaus.",
      status: completedSteps.includes('tradelines-reporting') ? 'completed' : 'pending'
    },
    {
      title: "Dispute Inaccuracies",
      description: "Dispute any errors on your business credit reports",
      details: "Regularly review your credit reports and dispute any inaccuracies. This includes incorrect payment history, account information, or personal information.",
      status: completedSteps.includes('dispute-inaccuracies') ? 'completed' : 'pending'
    },
    {
      title: "Paydex Score",
      description: "Build and maintain a strong Paydex score",
      details: "Paydex is D&B's business credit score (0-100). Aim for a score of 80+ for the best credit opportunities. Pay on time to build your score.",
      status: completedSteps.includes('paydex-score') ? 'completed' : 'pending'
    }
  ];

  const handleStepComplete = (step) => {
    const stepId = step.title.toLowerCase().replace(/\s+/g, '-');
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const completedCount = completedSteps.length;
  const totalSteps = steps.length;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Business Credit Reports</h1>
          <p className="text-gray-600 mb-6">
            Monitor and manage your business credit reports across all major bureaus. 
            Building strong credit reports is essential for accessing business funding.
          </p>
          
          <ProgressBar 
            completed={completedCount} 
            total={totalSteps} 
          />
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              step={step}
              status={step.status}
              onComplete={() => handleStepComplete(step)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreditReports; 