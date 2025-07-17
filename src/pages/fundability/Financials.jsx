import { useState } from 'react';
import StepCard from '../../components/StepCard';
import ProgressBar from '../../components/ProgressBar';

const Financials = () => {
  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    {
      title: "Time in Business",
      description: "Establish your business timeline and history",
      details: "Document how long your business has been operating. This includes both the time since incorporation and the time since you started business activities.",
      status: completedSteps.includes('time-in-business') ? 'completed' : 'pending'
    },
    {
      title: "Business Bank Account",
      description: "Open and maintain a business bank account",
      details: "Separate your business finances from personal finances. Open a dedicated business checking account in your business name.",
      status: completedSteps.includes('business-bank-account') ? 'completed' : 'pending'
    },
    {
      title: "Business Bank Account Statements",
      description: "Maintain regular bank statements",
      details: "Keep copies of your monthly bank statements. These will be required for credit applications and demonstrate financial stability.",
      status: completedSteps.includes('bank-statements') ? 'completed' : 'pending'
    },
    {
      title: "Business Bank Account Balance",
      description: "Maintain adequate account balances",
      details: "Keep sufficient funds in your business account. Most lenders require a minimum balance and regular deposits.",
      status: completedSteps.includes('account-balance') ? 'completed' : 'pending'
    },
    {
      title: "Business Tax Returns",
      description: "File and maintain business tax returns",
      details: "Ensure all business tax returns are filed on time and accurately. Keep copies for at least 3 years.",
      status: completedSteps.includes('tax-returns') ? 'completed' : 'pending'
    },
    {
      title: "Financial Statements",
      description: "Prepare financial statements",
      details: "Create and maintain profit & loss statements, balance sheets, and cash flow statements.",
      status: completedSteps.includes('financial-statements') ? 'completed' : 'pending'
    },
    {
      title: "Business Collateral",
      description: "Identify and document business assets",
      details: "List all business assets that could serve as collateral for loans. Include equipment, inventory, and real estate.",
      status: completedSteps.includes('collateral') ? 'completed' : 'pending'
    },
    {
      title: "Personal Tax Returns",
      description: "Maintain personal tax returns",
      details: "Keep personal tax returns up to date. Many business credit applications require personal financial information.",
      status: completedSteps.includes('personal-tax-returns') ? 'completed' : 'pending'
    },
    {
      title: "Business Revenue",
      description: "Track and document business revenue",
      details: "Maintain detailed records of all business income. This includes sales, services, and other revenue streams.",
      status: completedSteps.includes('revenue') ? 'completed' : 'pending'
    },
    {
      title: "Employees",
      description: "Document employee information",
      details: "Keep records of all employees, including W-2 forms and payroll information. This demonstrates business stability.",
      status: completedSteps.includes('employees') ? 'completed' : 'pending'
    },
    {
      title: "10% of Revenue",
      description: "Ensure revenue meets minimum requirements",
      details: "Many lenders require that your business generates at least 10% of the requested loan amount in monthly revenue.",
      status: completedSteps.includes('revenue-requirement') ? 'completed' : 'pending'
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
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Financials</h1>
          <p className="text-gray-600 mb-6">
            Build a strong financial foundation for your business. Complete these steps to establish 
            financial credibility and prepare for credit applications.
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

export default Financials; 