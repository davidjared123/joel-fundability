// Fundability Calculator Utility
// Calculates credit readiness score based on user data and US credit standards
// Configuration: See ./creditStandards.js for all configurable thresholds and weights

import {
  CREDIT_STANDARDS,
  convertPersonalCreditToPoints,
  convertPaydexToPoints,
  getFundabilityTier,
  meetsSBARequirement
} from './creditStandards.js';

/**
 * Calculate overall fundability score based on user data
 * @param {Object} userData - User's complete profile data
 * @returns {Object} Scores, percentages, and overall fundability rating
 */
export const calculateFundabilityScore = (userData) => {
  const standards = CREDIT_STANDARDS;
  let totalScore = 0;
  const maxScore = 100;

  const categoryScores = {
    foundation: 0,
    financials: 0,
    businessCredit: 0,
    personal: 0,
    applicationProcess: 0
  };

  // ==========================================================================
  // FOUNDATION SCORE (configured weight from standards)
  // ==========================================================================
  const foundation = userData.foundation || {};
  const foundationConfig = standards.foundation;
  let foundationScore = 0;

  // Business Name & Entity
  if (foundation.business_name) {
    foundationScore += foundationConfig.elements.businessName.points;
  }
  if (foundation.entity_type) {
    foundationScore += foundationConfig.elements.entityType.points;
  }

  // EIN - Critical for business credit
  if (foundation.ein_number) {
    foundationScore += foundationConfig.elements.einNumber.points;
  }

  // Business Address (complete)
  if (foundation.address_line1 && foundation.city && foundation.state && foundation.zip) {
    foundationScore += foundationConfig.elements.businessAddress.points;
  }

  // Formation date
  if (foundation.formation_date) {
    foundationScore += foundationConfig.elements.formationDate.points;
  }

  // Website & Professional Email (optional but valuable)
  if (foundation.website) {
    foundationScore += foundationConfig.elements.website.points;
  }
  if (foundation.email) {
    foundationScore += foundationConfig.elements.professionalEmail.points;
  }

  // Licenses
  if (foundation.license_type && foundation.license_number) {
    foundationScore += foundationConfig.elements.licenses.points;
  }

  // Cap at max points
  categoryScores.foundation = Math.min(foundationScore, foundationConfig.maxPoints);
  totalScore += categoryScores.foundation;

  // ==========================================================================
  // FINANCIALS SCORE
  // ==========================================================================
  const financials = userData.financials || {};
  const financialsConfig = standards.financials;
  let financialsScore = 0;

  // Time in Business - Very important for SBA loans
  if (financials.time_in_business || financials.business_entity_information) {
    financialsScore += financialsConfig.elements.timeInBusiness.points;
  }

  // Bank Account
  if (financials.bank_name) {
    financialsScore += financialsConfig.elements.bankAccount.points;
  }

  // Average Bank Balance - Scaled based on thresholds
  if (financials.average_bank_balance && financials.average_bank_balance > 0) {
    const balance = typeof financials.average_bank_balance === 'string'
      ? parseFloat(financials.average_bank_balance)
      : financials.average_bank_balance;

    const thresholds = financialsConfig.bankBalanceThresholds;
    const maxBalancePoints = financialsConfig.elements.averageBankBalance.points;

    let balancePoints = 0;
    if (balance >= thresholds.excellent) {
      balancePoints = maxBalancePoints;
    } else if (balance >= thresholds.good) {
      balancePoints = maxBalancePoints * 0.8;
    } else if (balance >= thresholds.fair) {
      balancePoints = maxBalancePoints * 0.6;
    } else if (balance >= thresholds.poor) {
      balancePoints = maxBalancePoints * 0.4;
    } else {
      balancePoints = maxBalancePoints * 0.2;
    }
    financialsScore += balancePoints;
  }

  // Tax Returns
  if (financials.filed_last_year_tax === true || financials.filed_last_year_tax === 'Yes') {
    financialsScore += financialsConfig.elements.taxReturns.points;
  }

  // Revenue
  if (financials.has_revenue === true || financials.has_revenue === 'Yes') {
    financialsScore += financialsConfig.elements.revenueHistory.points;
  }

  // Financial Statements
  if (financials.can_supply_financial_statements === true || financials.can_supply_financial_statements === 'Yes') {
    financialsScore += financialsConfig.elements.financialStatements.points;
  }

  // Collateral
  if (financials.has_collateral === true || financials.has_collateral === 'Yes') {
    financialsScore += financialsConfig.elements.collateral.points;
  }

  // W2 Employees
  if (financials.w2_employees && financials.w2_employees > 0) {
    financialsScore += financialsConfig.elements.w2Employees.points;
  }

  categoryScores.financials = Math.min(financialsScore, financialsConfig.maxPoints);
  totalScore += categoryScores.financials;

  // ==========================================================================
  // BUSINESS CREDIT SCORE
  // ==========================================================================
  const businessCredit = userData.businessCredit || {};
  const businessCreditConfig = standards.businessCredit;
  let businessCreditScore = 0;

  // D&B Registration
  if (businessCredit.dnb_report && businessCredit.dnb_report !== '') {
    businessCreditScore += businessCreditConfig.elements.dnbRegistered.points;
  }

  // PAYDEX Score - Using standards from D&B
  if (businessCredit.paydex_score) {
    const paydexNum = typeof businessCredit.paydex_score === 'string'
      ? parseInt(businessCredit.paydex_score, 10)
      : businessCredit.paydex_score;

    if (!isNaN(paydexNum)) {
      const paydexPoints = convertPaydexToPoints(
        paydexNum,
        businessCreditConfig.elements.paydexScore.points
      );
      businessCreditScore += paydexPoints;
    }
  }

  // Experian Profile
  if (businessCredit.experian_data && businessCredit.experian_data !== '') {
    businessCreditScore += businessCreditConfig.elements.experianProfile.points;
  }

  // Equifax Profile
  if (businessCredit.equifax_report && businessCredit.equifax_report !== '') {
    businessCreditScore += businessCreditConfig.elements.equifaxProfile.points;
  }

  // Tradelines Reporting
  if (businessCredit.tradelines_reporting && businessCredit.tradelines_reporting !== '') {
    businessCreditScore += businessCreditConfig.elements.tradelinesReporting.points;
  }

  // No Derogatory Records
  if (businessCredit.disputes === '' || businessCredit.disputes === 'No' || !businessCredit.disputes) {
    businessCreditScore += businessCreditConfig.elements.noDerogatory.points;
  }

  categoryScores.businessCredit = Math.min(businessCreditScore, businessCreditConfig.maxPoints);
  totalScore += categoryScores.businessCredit;

  // ==========================================================================
  // PERSONAL CREDIT SCORE
  // ==========================================================================
  const personal = userData.personal || {};
  const personalConfig = standards.personalCredit;
  let personalScore = 0;

  // Personal Credit Score (FICO)
  if (personal.credit_score) {
    const creditScoreNum = typeof personal.credit_score === 'string'
      ? parseInt(personal.credit_score, 10)
      : personal.credit_score;

    if (!isNaN(creditScoreNum)) {
      // Use the conversion function from standards
      const creditPoints = convertPersonalCreditToPoints(creditScoreNum, 10);
      personalScore += creditPoints;
    }
  }

  // Check for negative records (bankruptcies, liens, judgments)
  // Support both field names from different data sources
  const hasNegativeRecords =
    personal.bankruptcies_liens_judgements === 'Yes' ||
    personal.has_negative_records === true;

  if (!hasNegativeRecords) {
    personalScore += 5; // Bonus for clean record
  }

  categoryScores.personal = Math.min(personalScore, personalConfig.maxPoints);
  totalScore += categoryScores.personal;

  // ==========================================================================
  // APPLICATION PROCESS SCORE
  // ==========================================================================
  const applicationProcess = userData.applicationProcess || {};
  const applicationConfig = standards.applicationProcess;
  let applicationScore = 0;

  const completedSteps = applicationProcess.completedSteps || [];
  // Handle both array of objects (from DB) and array of strings
  const stepsCount = Array.isArray(completedSteps) ? completedSteps.length : 0;

  // Calculate based on total steps from configuration
  applicationScore = (stepsCount / applicationConfig.totalSteps) * applicationConfig.maxPoints;

  categoryScores.applicationProcess = Math.min(applicationScore, applicationConfig.maxPoints);
  totalScore += categoryScores.applicationProcess;

  // ==========================================================================
  // CALCULATE PERCENTAGES
  // ==========================================================================
  const percentages = {
    foundation: Math.round((categoryScores.foundation / standards.foundation.maxPoints) * 100),
    financials: Math.round((categoryScores.financials / standards.financials.maxPoints) * 100),
    businessCredit: Math.round((categoryScores.businessCredit / standards.businessCredit.maxPoints) * 100),
    personal: Math.round((categoryScores.personal / standards.personalCredit.maxPoints) * 100),
    applicationProcess: Math.round((categoryScores.applicationProcess / standards.applicationProcess.maxPoints) * 100)
  };

  const overallPercentage = Math.round((totalScore / maxScore) * 100);

  return {
    totalScore: Math.round(totalScore),
    maxScore,
    categoryScores,
    percentages,
    overallPercentage,
    tier: getFundabilityTier(overallPercentage),

    // Additional SBA eligibility info
    sbaEligibility: {
      sba7a: personal.credit_score ? meetsSBARequirement(parseInt(personal.credit_score), 'sba7a') : false,
      sbaMicroloan: personal.credit_score ? meetsSBARequirement(parseInt(personal.credit_score), 'sbaMicroloan') : false
    }
  };
};

/**
 * Generate personalized recommendations based on scores and standards
 * @param {Object} userData - User's complete profile data
 * @param {Object} scores - Calculated scores from calculateFundabilityScore
 * @returns {Object} Recommendations categorized by strengths, weaknesses, and suggestions
 */
export const generateRecommendations = (userData, scores) => {
  const standards = CREDIT_STANDARDS;
  const thresholds = standards.overallThresholds;

  const recommendations = {
    strengths: [],
    weaknesses: [],
    suggestions: [],
    sbaReadiness: []
  };

  // Foundation recommendations
  if (scores.percentages.foundation >= thresholds.excellent) {
    recommendations.strengths.push("Excellent legal structure and business presence");
  } else if (scores.percentages.foundation >= thresholds.good) {
    recommendations.strengths.push("Good business foundation established");
  } else {
    recommendations.weaknesses.push("Needs to complete basic business information");

    const foundation = userData.foundation || {};
    if (!foundation.ein_number) {
      recommendations.suggestions.push("Register for an EIN with the IRS - this is essential for business credit");
    }
    if (!foundation.address_line1) {
      recommendations.suggestions.push("Establish a professional business address (avoid PO Boxes)");
    }
    if (!foundation.website) {
      recommendations.suggestions.push("Create a professional website to improve credibility");
    }
  }

  // Financials recommendations
  if (scores.percentages.financials >= thresholds.excellent) {
    recommendations.strengths.push("Strong financial health demonstrated");
  } else if (scores.percentages.financials >= thresholds.good) {
    recommendations.strengths.push("Business finances in good condition");
  } else {
    recommendations.weaknesses.push("Limited financial documentation");

    const financials = userData.financials || {};
    if (!financials.bank_name) {
      recommendations.suggestions.push("Open a dedicated business bank account");
    }
    if (!financials.average_bank_balance || financials.average_bank_balance < standards.financials.bankBalanceThresholds.fair) {
      recommendations.suggestions.push(`Maintain an average bank balance of at least $${standards.financials.bankBalanceThresholds.fair.toLocaleString()}`);
    }
    if (!financials.filed_last_year_tax) {
      recommendations.suggestions.push("File business tax returns to demonstrate financial history");
    }
  }

  // Business Credit recommendations
  if (scores.percentages.businessCredit >= thresholds.excellent) {
    recommendations.strengths.push("Excellent business credit profile with major bureaus");
  } else if (scores.percentages.businessCredit >= thresholds.good) {
    recommendations.strengths.push("Good business credit history established");
  } else {
    recommendations.weaknesses.push("Limited business credit history");

    const businessCredit = userData.businessCredit || {};
    if (!businessCredit.dnb_report) {
      recommendations.suggestions.push("Register with Dun & Bradstreet to get a D-U-N-S number");
    }
    if (!businessCredit.paydex_score || businessCredit.paydex_score < standards.dnbPaydex.thresholds.good) {
      recommendations.suggestions.push(`Build PAYDEX score to ${standards.dnbPaydex.thresholds.excellent}+ by paying vendors early`);
    }
    recommendations.suggestions.push(`Establish at least ${standards.dnbPaydex.minimumTradelines} vendor tradelines that report to credit bureaus`);
  }

  // Personal Credit recommendations
  if (scores.percentages.personal >= thresholds.excellent) {
    recommendations.strengths.push("Excellent personal credit - qualifies for most SBA loans");
  } else if (scores.percentages.personal >= thresholds.good) {
    recommendations.strengths.push("Good personal credit history");
  } else {
    recommendations.weaknesses.push("Personal credit needs improvement");

    const personal = userData.personal || {};
    const creditScore = parseInt(personal.credit_score) || 0;

    if (creditScore < standards.personalCredit.thresholds.good) {
      recommendations.suggestions.push(`Improve personal credit score to ${standards.personalCredit.thresholds.good}+ for SBA loan eligibility`);
    }
    if (personal.bankruptcies_liens_judgements === 'Yes') {
      recommendations.suggestions.push("Address any bankruptcies, liens, or judgments - these severely impact fundability");
    }
  }

  // Application Process recommendations
  if (scores.percentages.applicationProcess >= thresholds.excellent) {
    recommendations.strengths.push("Application process well prepared");
  } else {
    recommendations.suggestions.push("Complete all application process checklist items");
    recommendations.suggestions.push("Gather all required documentation before applying");
  }

  // SBA Readiness check
  if (scores.sbaEligibility?.sba7a) {
    recommendations.sbaReadiness.push("✓ Meets credit requirements for SBA 7(a) loans");
  } else {
    recommendations.sbaReadiness.push(`✗ Need credit score of ${standards.personalCredit.sbaRequirements.sba7a}+ for SBA 7(a) loans`);
  }

  if (scores.sbaEligibility?.sbaMicroloan) {
    recommendations.sbaReadiness.push("✓ Meets credit requirements for SBA Microloans");
  }

  return recommendations;
};

// Re-export helper functions for use elsewhere
export {
  CREDIT_STANDARDS,
  getFundabilityTier,
  meetsSBARequirement,
  convertPersonalCreditToPoints,
  convertPaydexToPoints
};