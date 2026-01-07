import { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { useAuth } from "@/context/AuthContext";

export default function useSectionData(tableName) {
  const { user } = useAuth();
  const [sectionData, setSectionData] = useState({});

  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      const { data, _error } = await supabase
        .from(tableName)
        .select("item_key, item_value")
        .eq("user_id", user.id);
      if (data) {
        const obj = {};
        data.forEach(item => {
          obj[item.item_key] = item.item_value;
        });
        setSectionData(obj);
      }
    }
    fetchData();
  }, [user, tableName]);

  const saveSectionData = async (fields) => {
    if (!user) return;
    const promises = Object.entries(fields).map(async ([key, value]) => {
      const { error } = await supabase
        .from(tableName)
        .upsert({
          user_id: user.id,
          item_key: key,
          item_value: value,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id,item_key' });
      return error;
    });
    const errors = await Promise.all(promises);
    const error = errors.find(e => e);
    if (!error) {
      setSectionData(prev => ({ ...prev, ...fields }));
    }
    return error;
  };

  return [sectionData, saveSectionData];
}

// Mantener compatibilidad
export function useFoundationData() {
  return useSectionData("foundation_items");
}