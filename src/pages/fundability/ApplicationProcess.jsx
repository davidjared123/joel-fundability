import { useEffect, useState } from 'react';
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from '../../services/supabaseClient';
import StepCard from '../../components/StepCard';
import ProgressBar from '../../components/ProgressBar';

const ApplicationProcess = () => {
  const user = useUser();
  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    {
      title: "Application Submission",
      description: "Submit complete and accurate credit applications",
      details: "Ensure all required documents are included: business license, EIN, bank statements, tax returns, and financial statements. Double-check all information for accuracy.",
    },
    {
      title: "Troubleshooting",
      description: "Address common application issues and delays",
      details: "Common issues include incomplete documentation, credit score problems, or business structure issues. Have backup plans and alternative lenders ready.",
    },
    {
      title: "Renegotiating",
      description: "Negotiate better terms and conditions",
      details: "Once approved, negotiate for better rates, terms, or credit limits. Use competing offers to leverage better deals. Don't accept the first offer.",
    },
    {
      title: "Reversing Denials",
      description: "Appeal and reverse credit application denials",
      details: "If denied, request the specific reason for denial. Address the issues and reapply. Consider alternative lenders or different credit products.",
    }
  ];

  useEffect(() => {
    if (user) {
      fetchProgress();
    }
  }, [user]);

  const fetchProgress = async () => {
    const { data, error } = await supabase
      .from("application_process_progress")
      .select("step_name")
      .eq("user_id", user.id)
      .eq("completed", true);

    if (error) {
      console.error("Error fetching progress:", error);
    } else {
      setCompletedSteps(data.map((row) => row.step_name));
    }
  };

  const toggleStep = async (step) => {
    const stepId = step.title.toLowerCase().replace(/\s+/g, '-');
    const isCompleted = completedSteps.includes(stepId);

    const { error } = await supabase
      .from("application_process_progress")
      .upsert({
        user_id: user.id,
        step_name: stepId,
        completed: !isCompleted,
        updated_at: new Date(),
      });

    if (error) {
      console.error("Error updating step:", error);
    } else {
      setCompletedSteps((prev) =>
        isCompleted
          ? prev.filter((s) => s !== stepId)
          : [...prev, stepId]
      );
    }
  };

  const completedCount = completedSteps.length;
  const totalSteps = steps.length;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Application Process</h1>
          <p className="text-gray-600 mb-6">
            Master the credit application process to maximize your approval chances. 
            Learn how to submit strong applications and handle common issues.
          </p>

          <ProgressBar completed={completedCount} total={totalSteps} />
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              title={step.title}
              completed={completedSteps.includes(step.title.toLowerCase().replace(/\s+/g, '-'))}
              onToggle={() => toggleStep(step)}
            />
          ))}
        </div>

        {/* Application Tips */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-800 mb-3">Application Tips:</h3>
            <ul className="text-green-700 space-y-2 text-sm">
              <li>• Prepare all documents in advance</li>
              <li>• Double-check all information</li>
              <li>• Apply to multiple lenders</li>
              <li>• Keep copies of all applications</li>
              <li>• Follow up on applications</li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Common Mistakes:</h3>
            <ul className="text-blue-700 space-y-2 text-sm">
              <li>• Incomplete applications</li>
              <li>• Missing documentation</li>
              <li>• Applying too early</li>
              <li>• Not checking credit first</li>
              <li>• Accepting first offer</li>
            </ul>
          </div>
        </div>

        {/* Success Checklist */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Success Checklist:</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Before Applying:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Business credit established</li>
                <li>✓ Personal credit score 700+</li>
                <li>✓ All documents ready</li>
                <li>✓ Business bank account</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">During Application:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Complete all fields</li>
                <li>✓ Include all documents</li>
                <li>✓ Review before submitting</li>
                <li>✓ Keep application copy</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-700 mb-2">After Application:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Follow up regularly</li>
                <li>✓ Negotiate terms</li>
                <li>✓ Address any issues</li>
                <li>✓ Plan next steps</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationProcess;
