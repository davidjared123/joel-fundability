import { useState, useEffect } from "react";
import ProgressBar from "@/components/ProgressBar";
import StepCard from "@/components/StepCard";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/services/supabaseClient";
import { useFoundationData } from "@/hooks/useSectionData";
import BusinessName from "./foundation/BusinessName";
import EIN from "./foundation/EIN";
import BusinessAddress from "./foundation/BusinessAddress";
import WebsiteAndEmail from "./foundation/WebsiteAndEmail";
import Licenses from "./foundation/Licenses";

const steps = [
  { label: "Business Name & Entity Setup", path: "business-name-&-entity-setup", id: "business-name-entity-setup" },
  { label: "EIN Registration", path: "ein-registration", id: "ein-registration" },
  { label: "Business Address & Phone", path: "business-address-&-phone", id: "business-address-phone" },
  { label: "Website & Email Domain", path: "website-&-email-domain", id: "website-email-domain" },
  { label: "Licenses & Permits", path: "licenses-&-permits", id: "licenses-permits" },
];

export default function Foundation() {
  const { user } = useAuth();
  const [foundationData, saveFoundationData] = useFoundationData();
  const [completedSteps, setCompletedSteps] = useState([]);
  const [selectedStep, setSelectedStep] = useState(null);


  useEffect(() => {
    if (user) {
      fetchProgress();
    }
  }, [user]);

  const fetchProgress = async () => {
    const { data, error } = await supabase
      .from("foundation_progress")
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
      if (isCompleted) {
        const { error } = await supabase
          .from("foundation_progress")
          .delete()
          .eq("user_id", user.id)
          .eq("step_name", stepId);

        if (error) throw error;

        setCompletedSteps((prev) => prev.filter((s) => s !== stepId));
      } else {
        const { error } = await supabase
          .from("foundation_progress")
          .upsert({
            user_id: user.id,
            step_name: stepId,
            completed: true,
            updated_at: new Date(),
          });

        if (error) throw error;

        setCompletedSteps((prev) => [...new Set([...prev, stepId])]);
      }
    } catch (error) {
      console.error("Error toggling step:", error);
    }
  };

  const completedCount = new Set(completedSteps).size;

  const renderStepContent = () => {
    switch (selectedStep) {
      case 'business-name-entity-setup':
        return <BusinessName foundationData={foundationData} saveFoundationData={saveFoundationData} />;
      case 'ein-registration':
        return <EIN foundationData={foundationData} saveFoundationData={saveFoundationData} />;
      case 'business-address-phone':
        return <BusinessAddress foundationData={foundationData} saveFoundationData={saveFoundationData} />;
      case 'website-email-domain':
        return <WebsiteAndEmail foundationData={foundationData} saveFoundationData={saveFoundationData} />;
      case 'licenses-permits':
        return <Licenses foundationData={foundationData} saveFoundationData={saveFoundationData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Business Foundation</h2>
          <ProgressBar completed={completedCount} total={steps.length} />
        </div>
        <div className="grid gap-4">
          {steps.map((step) => {
            const stepId = step.id;
            return (
              <StepCard
                key={step.path}
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