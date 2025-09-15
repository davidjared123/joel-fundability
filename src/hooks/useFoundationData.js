import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";

export default function useFoundationData() {
  const session = useSession();
  const [foundationData, setFoundationData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!session?.user) return;
      const { data } = await supabase
        .from("foundation_data")
        .select("*")
        .eq("user_id", session.user.id)
        .single();
      if (data) setFoundationData(data);
    }
    fetchData();
  }, [session]);

  // Guardar datos (merge con los existentes)
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

  return [foundationData, saveFoundationData];
} 