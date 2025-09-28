import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { useAuth } from '../../context/AuthContext';
import StepCard from '../../components/StepCard';
import ProgressBar from '../../components/ProgressBar';

const CreditReports = () => {
  const { user } = useAuth();
  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    {
      title: "D&B Report",
      description: "Establish your Dun & Bradstreet business credit profile",
      details: "Dun & Bradstreet is the most important business credit bureau. You need to establish a D-U-N-S number and build your Paydex score.",
    },
    {
      title: "Experian Data",
      description: "Monitor your Experian business credit data",
      details: "Experian tracks business credit information including payment history, credit limits, and account balances.",
    },
    {
      title: "Equifax Reports",
      description: "Review your Equifax business credit reports",
      details: "Equifax provides business credit reports and scores. Monitor your account regularly for accuracy.",
    },
    {
      title: "Bureau Distribution",
      description: "Ensure your accounts report to all major bureaus",
      details: "Not all vendors report to all credit bureaus. Focus on vendors that report to D&B, Experian, and Equifax.",
    },
    {
      title: "Tradelines Reporting",
      description: "Build tradelines that report to business credit bureaus",
      details: "Tradelines are credit accounts that appear on your business credit report. Focus on accounts that report to major bureaus.",
    },
    {
      title: "Dispute Inaccuracies",
      description: "Dispute any errors on your business credit reports",
      details: "Regularly review your credit reports and dispute any inaccuracies. This includes incorrect payment history, account information, or personal information.",
    },
    {
      title: "Paydex Score",
      description: "Build and maintain a strong Paydex score",
      details: "Paydex is D&B's business credit score (0-100). Aim for a score of 80+ for the best credit opportunities. Pay on time to build your score.",
    }
  ];

  useEffect(() => {
    if (user) {
      fetchProgress();
    }
  }, [user]);

  const fetchProgress = async () => {
    const { data, error } = await supabase
      .from("credit_reports_progress") // ✅ tabla correcta
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

    try {
      if (isCompleted) {
        const { error } = await supabase
          .from("credit_reports_progress") // ✅ tabla correcta
          .delete()
          .eq("user_id", user.id)
          .eq("step_name", stepId);

        if (error) throw error;

        setCompletedSteps((prev) => prev.filter((s) => s !== stepId));
      } else {
        const { error } = await supabase
          .from("credit_reports_progress") // ✅ tabla correcta
          .upsert({
            user_id: user.id,
            step_name: stepId,
            completed: true,
            updated_at: new Date(),
          });

        if (error) throw error;

        setCompletedSteps((prev) => [...prev, stepId]);
      }
    } catch (error) {
      console.error("Error toggling step:", error);
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
          {steps.map((step, index) => {
            const stepId = step.title.toLowerCase().replace(/\s+/g, '-');
            return (
              <StepCard
                key={index}
                title={step.title}
                description={step.description}
                details={step.details}
                completed={completedSteps.includes(stepId)}
                onToggle={() => toggleStep(step)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CreditReports;
