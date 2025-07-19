import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";
import ProgressBar from "@/components/ProgressBar";
import StepCard from "@/components/StepCard";
import { useUser } from "@supabase/auth-helpers-react";

const steps = [
  "Business Name & Entity Setup",
  "EIN Registration",
  "Business Address & Phone",
  "Website & Email Domain",
  "Licenses & Permits",
];

const Foundation = () => {
  const user = useUser();
  const [completedSteps, setCompletedSteps] = useState([]);

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
      setCompletedSteps(data.map((row) => row.step_name));
    }
  };

  const normalizeStep = (step) => step.toLowerCase().replace(/\s+/g, '-');

  const toggleStep = async (step) => {
    const stepId = normalizeStep(step);
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Business Foundation</h2>
          <p className="text-gray-600 mb-6">
            Establishing a solid business foundation is crucial for building strong business credit.
          </p>
          <ProgressBar completed={completedCount} total={totalSteps} />
        </div>

        <div className="grid gap-4">
          {steps.map((step) => (
            <StepCard
              key={step}
              title={step}
              completed={completedSteps.includes(normalizeStep(step))}
              onToggle={() => toggleStep(step)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Foundation;