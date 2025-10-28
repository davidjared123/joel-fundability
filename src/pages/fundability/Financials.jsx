import { useState, useEffect } from "react";
import ProgressBar from "@/components/ProgressBar";
import StepCard from "@/components/StepCard";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/services/supabaseClient";
import { useSectionData } from "@/hooks/useSectionData";

// Import sub-step components (will be created soon)
import TimeInBusiness from "./financials/TimeInBusiness";
import BankName from "./financials/BankName";
import BankStatements from "./financials/BankStatements";
import AverageBankBalance from "./financials/AverageBankBalance";
import BusinessTaxReturn from "./financials/BusinessTaxReturn";
import FinancialStatements from "./financials/FinancialStatements";
import BusinessCollateral from "./financials/BusinessCollateral";
import PersonalTax from "./financials/PersonalTax";
import BusinessRevenue from "./financials/BusinessRevenue";
import Employees from "./financials/Employees";
import Reserves from "./financials/Reserves";

const steps = [
  { label: "Time in Business", id: "time-in-business" },
  { label: "Bank Name", id: "bank-name" },
  { label: "Bank Statements", id: "bank-statements" },
  { label: "Average Bank Balance", id: "average-bank-balance" },
  { label: "Business Tax Return", id: "business-tax-return" },
  { label: "Financial Statements", id: "financial-statements" },
  { label: "Business Collateral", id: "business-collateral" },
  { label: "Personal Tax Returns", id: "personal-tax-returns" },
  { label: "Business Revenue", id: "business-revenue" },
  { label: "Employees", id: "employees" },
  { label: "Reserves", id: "reserves" },
];

export default function Financials() {
  const { user } = useAuth();
  const [financialsData, saveFinancialsData] = useSectionData("financials_items");
  const [completedSteps, setCompletedSteps] = useState([]);
  const [selectedStep, setSelectedStep] = useState(null);

  // Function to check if a step is completed based on data
  const isStepCompleted = (stepId, data) => {
    switch (stepId) {
      case 'time-in-business':
        return data.business_entity_information;
      case 'bank-name':
        return data.bank_name;
      case 'bank-statements':
        return data.bank_statements_info;
      case 'average-bank-balance':
        return data.average_bank_balance;
      case 'business-tax-return':
        return data.filed_last_year_tax;
      case 'financial-statements':
        return data.can_supply_financial_statements;
      case 'business-collateral':
        return data.has_collateral;
      case 'personal-tax-returns':
        return data.personal_tax_up_to_date;
      case 'business-revenue':
        return data.has_revenue;
      case 'employees':
        return data.w2_employees;
      case 'reserves':
        return data.reserves; // Not implemented yet
      default:
        return false;
    }
  };

  // Update completed steps when financialsData changes
  useEffect(() => {
    if (financialsData) {
      const newCompletedSteps = steps
        .filter(step => isStepCompleted(step.id, financialsData))
        .map(step => step.id);
      setCompletedSteps(newCompletedSteps);
    }
  }, [financialsData]);

  useEffect(() => {
    if (user) {
      fetchProgress();
    }
  }, [user]);

  const fetchProgress = async () => {
    const { data, error } = await supabase
      .from("financials_progress")
      .select("step_name")
      .eq("user_id", user.id)
      .eq("completed", true);

    if (error) {
      console.error("Error fetching progress:", error);
    } else {
      setCompletedSteps([...new Set(data.map((row) => row.step_name))]);
    }
  };

  // Since steps are now auto-completed based on data, this function is no longer needed
  // Keeping empty function for compatibility with StepCard component
  const toggleStepCompleted = async () => {
    // Auto-completion is now handled by the useEffect above
  };

  const completedCount = new Set(completedSteps).size;

  const renderStepContent = () => {
    switch (selectedStep) {
      case 'time-in-business':
        return <TimeInBusiness sectionData={financialsData} saveData={saveFinancialsData} />;
      case 'bank-name':
        return <BankName sectionData={financialsData} saveData={saveFinancialsData} />;
      case 'bank-statements':
        return <BankStatements sectionData={financialsData} saveData={saveFinancialsData} />;
      case 'average-bank-balance':
        return <AverageBankBalance sectionData={financialsData} saveData={saveFinancialsData} />;
      case 'business-tax-return':
        return <BusinessTaxReturn sectionData={financialsData} saveData={saveFinancialsData} />;
      case 'financial-statements':
        return <FinancialStatements sectionData={financialsData} saveData={saveFinancialsData} />;
      case 'business-collateral':
        return <BusinessCollateral sectionData={financialsData} saveData={saveFinancialsData} />;
      case 'personal-tax-returns':
        return <PersonalTax sectionData={financialsData} saveData={saveFinancialsData} />;
      case 'business-revenue':
        return <BusinessRevenue sectionData={financialsData} saveData={saveFinancialsData} />;
      case 'employees':
        return <Employees sectionData={financialsData} saveData={saveFinancialsData} />;
      case 'reserves':
        return <Reserves sectionData={financialsData} saveData={saveFinancialsData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Financials</h2>
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
                onToggle={() => toggleStepCompleted(step)}
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
}