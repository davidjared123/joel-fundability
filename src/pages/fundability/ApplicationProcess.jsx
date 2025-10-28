import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import StepCard from '../../components/StepCard';
import ProgressBar from '../../components/ProgressBar';

const ApplicationProcess = () => {
  const { user } = useAuth();
  const [completedSteps, setCompletedSteps] = useState([]);
  const [selectedStep, setSelectedStep] = useState(null);

  const steps = [
    {
      title: "Application Submission",
      description: "You are now ready to begin improving your fundability, building business credit and exploring credit and loans",
      details: "NOTE: Any appearance of inaccurate or incongruent information across financial records, applications, or business filings gets you immediately declined. Use your Fundability System to complete all steps and give accurate responses to ensure you are not declined for things you have full control over.",
      substeps: [
        {
          title: "Marcar checklist: application-submission",
          description: "You are now ready to begin improving your fundability, building business credit and exploring credit and loans",
          details: "NOTE: Any appearance of inaccurate or incongruent information across financial records, applications, or business filings gets you immediately declined. Use your Fundability System to complete all steps and give accurate responses to ensure you are not declined for things you have full control over."
        }
      ]
    },
    {
      title: "Troubleshooting",
      description: "Our advisors are here to help",
      details: "After following steps 1-3, if your account is still not reporting, contact an advisor to help resolve this or any other issue you may be facing. We've seen it all! Our team of advisors have helped thousands of business owners from every industry resolve Fundability issues and can help you get to the bottom of why something isn't working. Click the Chat icon at the bottom right side of the screen to get your questions answered.",
      substeps: []
    },
    {
      title: "Renegotiation",
      description: "Our advisors are available to help",
      details: "Our financial experts can help you get the deal you want, as well as advise you when it's best to accept lower terms now, then renegotiate later. One final thing to consider when renegotiating is knowing when to accept a deal with less-than-ideal terms now, versus applying for other accounts in hopes that one will offer you the terms you want. Getting the best terms on the first try is ideal, but there is often a strong case to take the deal in hand now, and know you can renegotiate within 3 to 6 months. Our financial experts can help inform this decision, as well as help you ensure your efforts to renegotiate have the best chance at success.",
      substeps: []
    },
    {
      title: "When to reapply after a denial",
      description: "Not every denial can be reversed. If your application is not approved you can reapply, but read below before you do.",
      details: "Key things to know before reapplying: Every lender and creditor has a different policy on how soon you can reapply. Some require waiting 30 days, others require 6 months. Additionally, some lenders and creditors use the same companies to underwrite applications. Once you receive a decline from one, other creditors may decline your application based on the decision of another company that uses the same underwriter. Your advisor can help you to know who these lenders/creditors are and how long you should wait before reapplying.",
      substeps: []
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
            <div key={index}>
              <StepCard
                title={step.title}
                completed={completedSteps.includes(step.title.toLowerCase().replace(/\s+/g, '-'))}
                onToggle={() => toggleStep(step)}
                onClick={() => setSelectedStep(selectedStep === index ? null : index)}
              />
              {selectedStep === index && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">{step.description}</h4>
                  <p className="text-gray-600 mb-4">{step.details}</p>
                  {step.substeps && step.substeps.length > 0 && (
                    <div className="space-y-2">
                      {step.substeps.map((substep, subIndex) => (
                        <div key={subIndex} className="bg-white p-3 rounded border">
                          <h5 className="font-medium text-gray-700">{substep.title}</h5>
                          <p className="text-sm text-gray-600 mt-1">{substep.description}</p>
                          <p className="text-sm text-gray-500 mt-1">{substep.details}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
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
