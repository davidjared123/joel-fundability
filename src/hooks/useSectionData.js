import { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { useAuth } from "@/context/AuthContext";

export function useSectionData(tableName) {
  const { user } = useAuth();
  const [sectionData, setSectionData] = useState({});

  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      const { data } = await supabase
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

// Funciones específicas para cada sección
export function useFoundationData() {
  return useSectionData("foundation_items");
}

export function useFinancialsData() {
  return useSectionData("financials_items");
}

export function useCreditReportsData() {
  return useSectionData("credit_reports_items");
}

export function usePersonalData() {
  return useSectionData("personal_items");
}

export function useApplicationProcessData() {
  return useSectionData("application_process_items");
}