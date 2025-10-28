import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../context/AuthContext';

export const useFundabilityProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState({
    foundation: { completed: 0, total: 5 },
    financials: { completed: 0, total: 11 },
    businessCredit: { completed: 0, total: 7 },
    personal: { completed: 0, total: 5 },
    applicationProcess: { completed: 0, total: 4 }
  });
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAllData();
    }
  }, [user]);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      // Fetch Foundation data (from foundation_items table)
      const { data: foundationItems } = await supabase
        .from('foundation_items')
        .select('item_key, item_value')
        .eq('user_id', user.id);

      const foundationData = {};
      if (foundationItems) {
        foundationItems.forEach(item => {
          foundationData[item.item_key] = item.item_value;
        });
      }

      // Fetch Financials data (from financials_items table)
      const { data: financialsItems } = await supabase
        .from('financials_items')
        .select('item_key, item_value')
        .eq('user_id', user.id);

      const financialsData = {};
      if (financialsItems) {
        financialsItems.forEach(item => {
          financialsData[item.item_key] = item.item_value;
        });
      }

      // Fetch Business Credit data (from credit_reports_items table)
      const { data: businessCreditItems } = await supabase
        .from('credit_reports_items')
        .select('item_key, item_value')
        .eq('user_id', user.id);

      const businessCreditData = {};
      if (businessCreditItems) {
        businessCreditItems.forEach(item => {
          businessCreditData[item.item_key] = item.item_value;
        });
      }

      // Fetch Personal Credit data (from personal_items table)
      const { data: personalItems } = await supabase
        .from('personal_items')
        .select('item_key, item_value')
        .eq('user_id', user.id);

      const personalData = {};
      if (personalItems) {
        personalItems.forEach(item => {
          personalData[item.item_key] = item.item_value;
        });
      }

      // Fetch Application Process progress
      const { data: applicationProgress } = await supabase
        .from('application_process_progress')
        .select('step_name')
        .eq('user_id', user.id)
        .eq('completed', true);

      // Calculate progress for each section
      const newProgress = {
        foundation: calculateFoundationProgress(foundationData),
        financials: calculateFinancialsProgress(financialsData),
        businessCredit: calculateBusinessCreditProgress(businessCreditData),
        personal: calculatePersonalProgress(personalData),
        applicationProcess: calculateApplicationProgress(applicationProgress || [])
      };

      setProgress(newProgress);
      setUserData({
        foundation: foundationData || {},
        financials: financialsData || {},
        businessCredit: businessCreditData || {},
        personal: personalData || {},
        applicationProcess: { completedSteps: applicationProgress || [] }
      });

    } catch (error) {
      console.error('Error fetching fundability data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateFoundationProgress = (data) => {
    if (!data) return { completed: 0, total: 5 };

    let completed = 0;
    // Business Name & Entity Setup
    if (data.business_name && data.entity_type && data.formation_date) completed++;
    // EIN Registration
    if (data.ein_number) completed++;
    // Business Address & Phone
    if (data.business_name && data.address_line1 && data.city && data.state && data.zip) completed++;
    // Website & Email Domain
    if (data.website && data.email) completed++;
    // Licenses & Permits
    if (data.license_type && data.license_number) completed++;

    return { completed, total: 5 };
  };

  const calculateFinancialsProgress = (data) => {
    if (!data) return { completed: 0, total: 11 };

    let completed = 0;
    // Time in Business
    if (data.business_entity_information) completed++;
    // Bank Name
    if (data.bank_name) completed++;
    // Bank Statements
    if (data.bank_statements_info) completed++;
    // Average Bank Balance
    if (data.average_bank_balance) completed++;
    // Business Tax Return
    if (data.filed_last_year_tax) completed++;
    // Financial Statements
    if (data.can_supply_financial_statements) completed++;
    // Business Collateral
    if (data.has_collateral) completed++;
    // Personal Tax Returns
    if (data.personal_tax_up_to_date) completed++;
    // Business Revenue
    if (data.has_revenue) completed++;
    // Employees
    if (data.w2_employees) completed++;
    // Reserves (not implemented yet)
    // if (data.reserves) completed++;

    return { completed, total: 11 };
  };

  const calculateBusinessCreditProgress = (data) => {
    if (!data) return { completed: 0, total: 7 };

    let completed = 0;
    // D&B Report
    if (data.dnb_report && data.dnb_report !== '') completed++;
    // Experian Data
    if (data.experian_data && data.experian_data !== '') completed++;
    // Equifax Report
    if (data.equifax_report && data.equifax_report !== '') completed++;
    // Bureau Distribution
    if (data.bureau_distribution && data.bureau_distribution !== '') completed++;
    // Tradelines Reporting
    if (data.tradelines_reporting && data.tradelines_reporting !== '') completed++;
    // Disputes
    if (data.disputes && data.disputes !== '') completed++;
    // Paydex Score
    if (data.paydex_score && data.paydex_score !== '') completed++;

    return { completed, total: 7 };
  };

  const calculatePersonalProgress = (data) => {
    if (!data) return { completed: 0, total: 5 };

    let completed = 0;
    // Personal Credit Score
    if (data.credit_score && data.credit_score !== '') completed++;
    // Credit Report
    if (data.credit_report && (data.credit_report === 'Yes' || data.credit_report === 'No')) completed++;
    // LexisNexis
    if (data.lexisnexis && (data.lexisnexis === 'Yes' || data.lexisnexis === 'No')) completed++;
    // Chex Systems
    if (data.chex_systems && (data.chex_systems === 'Yes' || data.chex_systems === 'No')) completed++;
    // Bankruptcies, Liens and Judgements
    if (data.bankruptcies_liens_judgements && (data.bankruptcies_liens_judgements === 'Yes' || data.bankruptcies_liens_judgements === 'No')) completed++;

    return { completed, total: 5 };
  };

  const calculateApplicationProgress = (completedSteps) => {
    return { completed: completedSteps.length, total: 4 };
  };

  const getOverallProgress = () => {
    const totalCompleted = Object.values(progress).reduce((sum, section) => sum + section.completed, 0);
    const totalSteps = Object.values(progress).reduce((sum, section) => sum + section.total, 0);
    return Math.round((totalCompleted / totalSteps) * 100);
  };

  return {
    progress,
    userData,
    loading,
    getOverallProgress,
    refetch: fetchAllData
  };
};