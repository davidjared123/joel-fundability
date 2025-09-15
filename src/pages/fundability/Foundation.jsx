import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { Outlet, useNavigate } from "react-router-dom";
import ProgressBar from "@/components/ProgressBar";
import StepCard from "@/components/StepCard";

const steps = [
  { label: "Business Name & Entity Setup", path: "business-name-&-entity-setup" },
  { label: "EIN Registration", path: "ein-registration" },
  { label: "Business Address & Phone", path: "business-address-&-phone" },
  { label: "Website & Email Domain", path: "website-&-email-domain" },
  { label: "Licenses & Permits", path: "licenses-&-permits" },
];

export default function Foundation() {
  const session = useSession();
  const [foundationData, setFoundationData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!session?.user) return;
      setLoading(true);
      const { data } = await supabase
        .from("foundation_data")
        .select("*")
        .eq("user_id", session.user.id)
        .single();
      if (data) setFoundationData(data);
      setLoading(false);
    }
    fetchData();
  }, [session]);

  const saveFoundationData = async (fields) => {
    if (!session?.user) return;
    const { error } = await supabase
      .from("foundation_data")
      .upsert({
        ...foundationData,
        ...fields,
        user_id: session.user.id,
        updated_at: new Date().toISOString(),
      });
    if (!error) setFoundationData({ ...foundationData, ...fields });
    return error;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Business Foundation</h2>
          <ProgressBar completed={0} total={steps.length} />
        </div>
        <div className="grid gap-4">
          {steps.map((step) => (
            <StepCard
              key={step.path}
              title={step.label}
              completed={false}
              onToggle={() => {}}
              onClick={() => navigate(step.path)}
            />
          ))}
        </div>
        <div className="mt-8">
          <Outlet context={{ foundationData, saveFoundationData, loading }} />
        </div>
      </div>
    </div>
  );
}