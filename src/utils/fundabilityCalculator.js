// Fundability Calculator Utility
// Calculates credit readiness score based on user data

export const calculateFundabilityScore = (userData) => {
  let totalScore = 0;
  let maxScore = 100;
  let categoryScores = {
    foundation: 0,
    financials: 0,
    businessCredit: 0,
    personal: 0,
    applicationProcess: 0
  };

  // Foundation Score (25% - 25 points max)
  const foundation = userData.foundation || {};
  let foundationScore = 0;
  if (foundation.business_name) foundationScore += 5;
  if (foundation.entity_type) foundationScore += 5;
  if (foundation.ein_number) foundationScore += 5;
  if (foundation.address_line1 && foundation.city && foundation.state && foundation.zip) foundationScore += 5;
  if (foundation.website) foundationScore += 3;
  if (foundation.email) foundationScore += 2;
  categoryScores.foundation = foundationScore;
  totalScore += foundationScore;

  // Financials Score (25% - 25 points max)
  const financials = userData.financials || {};
  let financialsScore = 0;
  if (financials.time_in_business) financialsScore += 5;
  if (financials.average_bank_balance && financials.average_bank_balance > 0) {
    // Higher balance = higher score (up to 5 points)
    const balanceScore = Math.min(5, (financials.average_bank_balance / 10000) * 5);
    financialsScore += balanceScore;
  }
  if (financials.filed_last_year_tax) financialsScore += 5;
  if (financials.has_revenue) financialsScore += 5;
  if (financials.can_supply_financial_statements) financialsScore += 5;
  categoryScores.financials = financialsScore;
  totalScore += financialsScore;

  // Business Credit Score (25% - 25 points max)
  const businessCredit = userData.businessCredit || {};
  let businessCreditScore = 0;
  if (businessCredit.paydex_score) {
    // PAYDEX score ranges from 0-100, convert to 0-10 points
    businessCreditScore += (businessCredit.paydex_score / 100) * 10;
  }
  if (businessCredit.dnb_report) businessCreditScore += 5;
  if (businessCredit.experian_data) businessCreditScore += 5;
  if (businessCredit.equifax_report) businessCreditScore += 5;
  categoryScores.businessCredit = businessCreditScore;
  totalScore += businessCreditScore;

  // Personal Score (15% - 15 points max)
  const personal = userData.personal || {};
  let personalScore = 0;
  if (personal.credit_score) {
    // Credit score 300-850, convert to 0-10 points
    const creditScorePoints = ((personal.credit_score - 300) / 550) * 10;
    personalScore += Math.max(0, Math.min(10, creditScorePoints));
  }
  if (!personal.has_negative_records) personalScore += 5;
  categoryScores.personal = personalScore;
  totalScore += personalScore;

  // Application Process Score (10% - 10 points max)
  const applicationProcess = userData.applicationProcess || {};
  let applicationScore = 0;
  const completedSteps = applicationProcess.completedSteps || [];
  applicationScore = (completedSteps.length / 4) * 10; // 4 steps total
  categoryScores.applicationProcess = applicationScore;
  totalScore += applicationScore;

  // Calculate percentages
  const percentages = {
    foundation: Math.round((categoryScores.foundation / 25) * 100),
    financials: Math.round((categoryScores.financials / 25) * 100),
    businessCredit: Math.round((categoryScores.businessCredit / 25) * 100),
    personal: Math.round((categoryScores.personal / 15) * 100),
    applicationProcess: Math.round((categoryScores.applicationProcess / 10) * 100)
  };

  return {
    totalScore: Math.round(totalScore),
    maxScore,
    categoryScores,
    percentages,
    overallPercentage: Math.round((totalScore / maxScore) * 100)
  };
};

export const generateRecommendations = (userData, scores) => {
  const recommendations = {
    strengths: [],
    weaknesses: [],
    suggestions: []
  };

  // Foundation recommendations
  if (scores.percentages.foundation >= 80) {
    recommendations.strengths.push("Excellent legal structure and business presence");
  } else if (scores.percentages.foundation >= 60) {
    recommendations.strengths.push("Good business foundation established");
  } else {
    recommendations.weaknesses.push("Needs to complete basic business information");
    recommendations.suggestions.push("Register your EIN if you don't have one yet");
    recommendations.suggestions.push("Establish a professional business address");
  }

  // Financials recommendations
  if (scores.percentages.financials >= 80) {
    recommendations.strengths.push("Strong financial health demonstrated");
  } else if (scores.percentages.financials >= 60) {
    recommendations.strengths.push("Business finances in good condition");
  } else {
    recommendations.weaknesses.push("Limited financial information");
    recommendations.suggestions.push("Keep financial statements updated");
    recommendations.suggestions.push("Increase average bank balance");
  }

  // Business Credit recommendations
  if (scores.percentages.businessCredit >= 80) {
    recommendations.strengths.push("Excellent business credit history");
  } else if (scores.percentages.businessCredit >= 60) {
    recommendations.strengths.push("Good business credit history");
  } else {
    recommendations.weaknesses.push("Limited business credit history");
    recommendations.suggestions.push("Establish business credit lines");
    recommendations.suggestions.push("Keep payments on time for all accounts");
  }

  // Personal recommendations
  if (scores.percentages.personal >= 80) {
    recommendations.strengths.push("Excellent personal credit history");
  } else if (scores.percentages.personal >= 60) {
    recommendations.strengths.push("Good personal credit history");
  } else {
    recommendations.weaknesses.push("Needs to improve personal credit");
    recommendations.suggestions.push("Pay off all outstanding debts");
    recommendations.suggestions.push("Avoid new credit applications for 6-12 months");
  }

  // Application Process recommendations
  if (scores.percentages.applicationProcess >= 80) {
    recommendations.strengths.push("Application process well prepared");
  } else {
    recommendations.suggestions.push("Complete all application process steps");
    recommendations.suggestions.push("Prepare all required documentation");
  }

  return recommendations;
};