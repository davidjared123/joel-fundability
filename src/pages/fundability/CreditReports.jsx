import { useState, useEffect } from "react";
import ProgressBar from "@/components/ProgressBar";
import StepCard from "@/components/StepCard";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/services/supabaseClient";
import { useSectionData } from "@/hooks/useSectionData";

// Import sub-step components
import DNBReport from "./credit-reports/DNBReport";
import ExperianData from "./credit-reports/ExperianData";
import EquifaxReport from "./credit-reports/EquifaxReport";
import BureauDistribution from "./credit-reports/BureauDistribution";
import TradelinesReporting from "./credit-reports/TradelinesReporting";
import Disputes from "./credit-reports/Disputes";
import PaydexScore from "./credit-reports/PaydexScore";

const steps = [
  { label: "D&B Report", id: "dnb-report" },
  { label: "Experian Data", id: "experian-data" },
  { label: "Equifax Report", id: "equifax-report" },
  { label: "Bureau Distribution", id: "bureau-distribution" },
  { label: "Tradelines Reporting", id: "tradelines-reporting" },
  { label: "Disputes", id: "disputes" },
  { label: "Paydex Score", id: "paydex-score" },
];

export default function BusinessCredit() {
  const { user } = useAuth();
  const [creditReportsData, saveCreditReportsData] = useSectionData("credit_reports_items");
  const [foundationData] = useSectionData("foundation_items"); // Data from foundation section
  const [completedSteps, setCompletedSteps] = useState([]);
  const [selectedStep, setSelectedStep] = useState(null);

  useEffect(() => {
    if (user) {
      fetchProgress();
    }
  }, [user]);

  const fetchProgress = async () => {
    const { data, error } = await supabase
      .from("credit_reports_progress")
      .select("step_name")
      .eq("user_id", user.id)
      .eq("completed", true);

    if (error) {
      console.error("Error fetching progress:", error);
    } else {
      setCompletedSteps([...new Set(data.map((row) => row.step_name))]);
    }
  };

  const toggleStepCompleted = async (step) => {
    const stepId = step.id;
    const isCompleted = completedSteps.includes(stepId);

    try {
      const { error } = await supabase
        .from("credit_reports_progress")
        .upsert({
          user_id: user.id,
          step_name: stepId,
          completed: !isCompleted,
          updated_at: new Date(),
        }, { onConflict: 'user_id,step_name' });

      if (error) throw error;

      if (isCompleted) {
        setCompletedSteps((prev) => prev.filter((s) => s !== stepId));
      } else {
        setCompletedSteps((prev) => [...new Set([...prev, stepId])]);
      }
    } catch (error) {
      console.error("Error toggling step:", error);
    }
  };

  const completedCount = new Set(completedSteps).size;

  const renderStepContent = () => {
    const props = {
      sectionData: creditReportsData,
      saveData: saveCreditReportsData,
      foundationData: foundationData, // Pass foundation data to sub-steps
    };

    switch (selectedStep) {
      case 'dnb-report':
        return <DNBReport {...props} />;
      case 'experian-data':
        return <ExperianData {...props} />;
      case 'equifax-report':
        return <EquifaxReport {...props} />;
      case 'bureau-distribution':
        return <BureauDistribution />;
      case 'tradelines-reporting':
        return <TradelinesReporting />;
      case 'disputes':
        return <Disputes />;
      case 'paydex-score':
        return <PaydexScore {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Business Credit Builder</h2>
          <ProgressBar completed={completedCount} total={steps.length} />
        </div>
        <div className="grid gap-4">
          {steps.map((step) => (
            <StepCard
              key={step.id}
              title={step.label}
              completed={completedSteps.includes(step.id)}
              onToggle={() => toggleStepCompleted(step)}
              onClick={() => setSelectedStep(step.id)}
            />
          ))}
        </div>
      </div>

      {selectedStep && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto relative">
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