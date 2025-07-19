import { useEffect, useState } from 'react';
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from '../../services/supabaseClient';
import StepCard from '../../components/StepCard';
import ProgressBar from '../../components/ProgressBar';

const Financials = () => {
  const user = useUser();
  const [completedSteps, setCompletedSteps] = useState([]);

  const steps = [
    {
      title: "Time in Business",
      description: "Establish your business timeline and history",
      details: "Document how long your business has been operating. This includes both the time since incorporation and the time since you started business activities.",
    },
    {
      title: "Business Bank Account",
      description: "Open and maintain a business bank account",
      details: "Separate your business finances from personal finances. Open a dedicated business checking account in your business name.",
    },
    {
      title: "Business Bank Account Statements",
      description: "Maintain regular bank statements",
      details: "Keep copies of your monthly bank statements. These will be required for credit applications and demonstrate financial stability.",
    },
    {
      title: "Business Bank Account Balance",
      description: "Maintain adequate account balances",
      details: "Keep sufficient funds in your business account. Most lenders require a minimum balance and regular deposits.",
    },
    {
      title: "Business Tax Returns",
      description: "File and maintain business tax returns",
      details: "Ensure all business tax returns are filed on time and accurately. Keep copies for at least 3 years.",
    },
    {
      title: "Financial Statements",
      description: "Prepare financial statements",
      details: "Create and maintain profit & loss statements, balance sheets, and cash flow statements.",
    },
    {
      title: "Business Collateral",
      description: "Identify and document business assets",
      details: "List all business assets that could serve as collateral for loans. Include equipment, inventory, and real estate.",
    },
    {
      title: "Personal Tax Returns",
      description: "Maintain personal tax returns",
      details: "Keep personal tax returns up to date. Many business credit applications require personal financial information.",
    },
    {
      title: "Business Revenue",
      description: "Track and document business revenue",
      details: "Maintain detailed records of all business income. This includes sales, services, and other revenue streams.",
    },
    {
      title: "Employees",
      description: "Document employee information",
      details: "Keep records of all employees, including W-2 forms and payroll information. This demonstrates business stability.",
    },
    {
      title: "10% of Revenue",
      description: "Ensure revenue meets minimum requirements",
      details: "Many lenders require that your business generates at least 10% of the requested loan amount in monthly revenue.",
    }
  ];

  useEffect(() => {
    if (user) {
      fetchProgress();
    }
  }, [user]);

  const fetchProgress = async () => {
    const { data, error } = await supabase
      .from("financials_progress") // ✅ corregido: tabla correcta
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
          .from("financials_progress") // ✅ corregido
          .delete()
          .eq("user_id", user.id)
          .eq("step_name", stepId);

        if (error) throw error;

        setCompletedSteps((prev) => prev.filter((s) => s !== stepId));
      } else {
        const { error } = await supabase
          .from("financials_progress") // ✅ corregido
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

export default Financials;
