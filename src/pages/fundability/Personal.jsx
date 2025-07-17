import { useState } from 'react';
import StepCard from '../../components/StepCard';
import ProgressBar from '../../components/ProgressBar';

const Personal = () => {
  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    {
      title: "Personal Credit Score",
      description: "Monitor and improve your personal credit score",
      details: "Your personal credit score affects business credit applications. Aim for a score of 700+ for the best opportunities. Pay bills on time and keep credit utilization low.",
      status: completedSteps.includes('personal-credit-score') ? 'completed' : 'pending'
    },
    {
      title: "Credit Report",
      description: "Review your personal credit report regularly",
      details: "Get free copies of your credit report from all three bureaus annually. Review for accuracy and dispute any errors. Monitor for identity theft.",
      status: completedSteps.includes('credit-report') ? 'completed' : 'pending'
    },
    {
      title: "LexisNexis",
      description: "Check your LexisNexis consumer disclosure report",
      details: "LexisNexis maintains consumer reports that may affect your credit applications. Request your report annually and dispute any inaccuracies.",
      status: completedSteps.includes('lexisnexis') ? 'completed' : 'pending'
    },
    {
      title: "Chex Systems",
      description: "Review your Chex Systems report",
      details: "Chex Systems tracks banking history. A negative report can affect your ability to open business bank accounts. Request your report and dispute any errors.",
      status: completedSteps.includes('chex-systems') ? 'completed' : 'pending'
    },
    {
      title: "Bankruptcies, Liens and Judgements",
      description: "Address any negative public records",
      details: "Bankruptcies, liens, and judgments can severely impact your credit applications. Work to resolve these issues before applying for business credit.",
      status: completedSteps.includes('public-records') ? 'completed' : 'pending'
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
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Personal Credit Management</h1>
          <p className="text-gray-600 mb-6">
            Manage your personal credit profile to support your business credit applications. 
            Many business credit applications require personal credit checks.
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

        {/* Additional Information */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Important Notes:</h3>
          <ul className="text-blue-700 space-y-2 text-sm">
            <li>• Personal credit affects business credit applications</li>
            <li>• Aim for a personal credit score of 700+</li>
            <li>• Monitor all credit reports regularly</li>
            <li>• Dispute any inaccuracies immediately</li>
            <li>• Keep personal and business finances separate</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Personal; 