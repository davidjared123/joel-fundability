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
  const totalSteps = steps.length;

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

  const toggleStep = async (step) => {
    const isCompleted = completedSteps.includes(step);

    const { error } = await supabase
      .from("foundation_progress")
      .upsert({
        user_id: user.id,
        step_name: step,
        completed: !isCompleted,
        updated_at: new Date(),
      });

    if (error) {
      console.error("Error updating step:", error);
    } else {
      setCompletedSteps((prev) =>
        isCompleted
          ? prev.filter((s) => s !== step)
          : [...prev, step]
      );
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-2">Business Foundation</h2>
      <p className="mb-4 text-gray-600">
        Establishing a solid business foundation is crucial for building strong business credit.
      </p>

      <div className="mb-6">
        <ProgressBar completed={completedSteps.length} total={totalSteps} />
      </div>

      <div className="grid gap-4">
        {steps.map((step) => (
          <StepCard
            key={step}
            title={step}
            completed={completedSteps.includes(step)}
            onToggle={() => toggleStep(step)}
          />
        ))}
      </div>
    </div>
  );
};

export default Foundation;
