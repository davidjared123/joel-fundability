import { useEffect, useState } from 'react';
import { useSectionData } from '../../hooks/useSectionData';
import StepCard from '../../components/StepCard';
import ProgressBar from '../../components/ProgressBar';

// Import sub-step components
import PersonalCreditScore from './personal/PersonalCreditScore';
import CreditReport from './personal/CreditReport';
import LexisNexis from './personal/LexisNexis';
import ChexSystems from './personal/ChexSystems';
import BankruptciesLiens from './personal/BankruptciesLiens';

const steps = [
  { label: "Personal Credit Score", id: "personal-credit-score" },
  { label: "Credit Report", id: "credit-report" },
  { label: "LexisNexis", id: "lexisnexis" },
  { label: "Chex Systems", id: "chex-systems" },
  { label: "Bankruptcies, Liens and Judgements", id: "bankruptcies-liens-and-judgements" },
];

const Personal = () => {
  const [personalData, savePersonalData] = useSectionData("personal_items");
  const [completedSteps, setCompletedSteps] = useState([]);
  const [selectedStep, setSelectedStep] = useState(null);

  // Function to check if a step is completed based on data
  const isStepCompleted = (stepId, data) => {
    switch (stepId) {
      case 'personal-credit-score':
        return data.credit_score;
      case 'credit-report':
        return data.credit_report;
      case 'lexisnexis':
        return data.lexisnexis;
      case 'chex-systems':
        return data.chex_systems;
      case 'bankruptcies-liens-and-judgements':
        return data.bankruptcies_liens_judgements;
      default:
        return false;
    }
  };

  // Update completed steps when personalData changes
  useEffect(() => {
    if (personalData) {
      const newCompletedSteps = steps
        .filter(step => isStepCompleted(step.id, personalData))
        .map(step => step.id);
      setCompletedSteps(newCompletedSteps);
    }
  }, [personalData]);

  const toggleStepCompleted = async () => {
    // Auto-completion is now handled by the useEffect above
  };

  const renderStepContent = () => {
    switch (selectedStep) {
      case 'personal-credit-score':
        return <PersonalCreditScore sectionData={personalData} saveData={savePersonalData} />;
      case 'credit-report':
        return <CreditReport sectionData={personalData} saveData={savePersonalData} />;
      case 'lexisnexis':
        return <LexisNexis sectionData={personalData} saveData={savePersonalData} />;
      case 'chex-systems':
        return <ChexSystems sectionData={personalData} saveData={savePersonalData} />;
      case 'bankruptcies-liens-and-judgements':
        return <BankruptciesLiens sectionData={personalData} saveData={savePersonalData} />;
      default:
        return null;
    }
  };

  const completedCount = completedSteps.length;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Personal Credit Management</h2>
          <ProgressBar completed={completedCount} total={steps.length} />
        </div>
        <div className="grid gap-4">
          {steps.map((step) => {
            const stepId = step.id;
            return (
              <StepCard
                key={step.id}
                title={step.label}
                completed={completedSteps.includes(stepId)}
                onToggle={() => toggleStepCompleted()}
                onClick={() => setSelectedStep(step.id)}
              />
            );
          })}
        </div>
      </div>

      {selectedStep && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedStep(null)}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedStep(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
            {renderStepContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Personal;
