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

  // Function to check if a step is completed based on data
  const isStepCompleted = (stepId, data) => {
    switch (stepId) {
      case 'business-name-entity-setup':
        return data.business_name && data.entity_type && data.formation_date;
      case 'ein-registration':
        return data.ein_number;
      case 'business-address-phone':
        return data.business_name && data.address_line1 && data.city && data.state && data.zip;
      case 'website-email-domain':
        return data.website && data.email;
      case 'licenses-permits':
        return data.license_type && data.license_number;
      default:
        return false;
    }
  };

  // Update completed steps when foundationData changes
  useEffect(() => {
    if (foundationData) {
      const newCompletedSteps = steps
        .filter(step => isStepCompleted(step.id, foundationData))
        .map(step => step.id);
      setCompletedSteps(newCompletedSteps);
    }
  }, [foundationData]);

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

  // Since steps are now auto-completed based on data, this function is no longer needed
  // Keeping empty function for compatibility with StepCard component
  const toggleStepCompleted = async () => {
    // Auto-completion is now handled by the useEffect above
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