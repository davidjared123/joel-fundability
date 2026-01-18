/**
 * US Business Credit Fundability Standards Configuration
 * 
 * This file contains the official scoring standards used by major US credit bureaus
 * and lenders. Update this file to adjust the fundability calculations.
 * 
 * Sources: Dun & Bradstreet, Experian, Equifax, SBA, NAV.com, NerdWallet
 * Last Updated: 2026-01-07
 */

export const CREDIT_STANDARDS = {
    // ==========================================================================
    // PERSONAL CREDIT (FICO Score)
    // ==========================================================================
    personalCredit: {
        scoreRange: { min: 300, max: 850 },

        // Score thresholds based on SBA loan requirements
        thresholds: {
            excellent: 750,      // Excellent - Best rates and terms
            good: 680,           // Good - Qualifies for most SBA loans
            fair: 630,           // Fair - May qualify with conditions
            poor: 580,           // Poor - Limited options
            veryPoor: 300        // Very Poor - Unlikely to qualify
        },

        // Weight in overall fundability score (0-100%)
        weight: 15,
        maxPoints: 15,

        // SBA Loan minimum requirements by type
        sbaRequirements: {
            sba7a: 680,           // Standard 7(a) loan
            sba504: 680,          // 504 fixed asset loan
            sbaExpress: 650,      // Express loans
            sbaMicroloan: 620,    // Microloans (up to $50k)
            sbaCAPLines: 660,     // Lines of credit
            sbaDisaster: 580      // Disaster loans
        },

        // Negative records impact
        negativeRecords: {
            bankruptcyImpact: 'severe',     // -200 to -300 points typically
            lienImpact: 'high',             // -50 to -100 points
            judgmentImpact: 'high',         // -50 to -100 points
            collectionImpact: 'moderate'    // -25 to -50 points
        }
    },

    // ==========================================================================
    // DUN & BRADSTREET PAYDEX SCORE
    // ==========================================================================
    dnbPaydex: {
        scoreRange: { min: 0, max: 100 },

        // Score interpretation
        thresholds: {
            excellent: 80,       // 80-100: Payments on time or early
            good: 70,            // 70-79: Payments slightly late
            fair: 50,            // 50-69: Inconsistent payment history
            poor: 0              // 0-49: Frequent late payments
        },

        // Weight in overall fundability score
        weight: 10,
        maxPoints: 10,

        // What each score range means
        interpretation: {
            100: 'Payments 30 days early',
            90: 'Payments 20 days early',
            80: 'Payments on time (within terms)',
            70: 'Payments 15 days late',
            60: 'Payments 22 days late',
            50: 'Payments 30 days late',
            40: 'Payments 60 days late',
            30: 'Payments 90 days late',
            20: 'Payments 120 days late'
        },

        // Minimum tradelines required
        minimumTradelines: 3,
        minimumPaymentExperiences: 4
    },

    // ==========================================================================
    // EXPERIAN INTELLISCORE PLUS
    // ==========================================================================
    experianIntelliscore: {
        scoreRange: { min: 1, max: 100 },

        thresholds: {
            excellent: 76,        // Low risk of delinquency
            good: 51,             // Low-medium risk
            fair: 26,             // Medium risk
            poor: 1               // High risk
        },

        weight: 8,
        maxPoints: 8,

        // Risk percentiles
        riskInterpretation: {
            '76-100': 'Low risk - 10% chance of serious delinquency',
            '51-75': 'Low-medium risk - 15% chance',
            '26-50': 'Medium risk - 30% chance',
            '1-25': 'High risk - 50%+ chance'
        }
    },

    // ==========================================================================
    // EQUIFAX BUSINESS SCORES
    // ==========================================================================
    equifax: {
        // Payment Index (most relevant for fundability)
        paymentIndex: {
            scoreRange: { min: 1, max: 100 },
            thresholds: {
                excellent: 90,      // On-time or early payments
                good: 80,           // 1-30 days late (occasional)
                fair: 60,           // 31-60 days late
                poor: 40            // 61-90 days late
            },
            weight: 7,
            maxPoints: 7
        },

        // Credit Risk Score
        creditRiskScore: {
            scoreRange: { min: 101, max: 992 },
            thresholds: {
                excellent: 750,
                good: 550,
                fair: 350,
                poor: 101
            }
        },

        // Business Failure Risk Score
        businessFailureRisk: {
            scoreRange: { min: 1000, max: 1880 },
            thresholds: {
                low: 1600,          // Low failure risk
                moderate: 1315,     // Moderate risk
                high: 1000          // High failure risk
            }
        }
    },

    // ==========================================================================
    // FOUNDATION (Business Legal Structure)
    // ==========================================================================
    foundation: {
        weight: 25,
        maxPoints: 25,

        // Required elements and their point values
        elements: {
            businessName: { points: 3, required: true },
            entityType: { points: 4, required: true },  // LLC, Corp, etc.
            einNumber: { points: 5, required: true },
            formationDate: { points: 2, required: true },
            businessAddress: { points: 4, required: true },
            businessPhone: { points: 2, required: true },
            website: { points: 2, required: false },
            professionalEmail: { points: 1, required: false },  // @company.com
            licenses: { points: 2, required: false }
        },

        // Entity type preferences for lenders
        entityTypeRanking: {
            'C-Corp': 5,
            'S-Corp': 4,
            'LLC': 3,
            'Partnership': 2,
            'Sole Proprietorship': 1
        }
    },

    // ==========================================================================
    // FINANCIALS
    // ==========================================================================
    financials: {
        weight: 25,
        maxPoints: 25,

        elements: {
            timeInBusiness: { points: 4, required: true },
            bankAccount: { points: 3, required: true },
            bankStatements: { points: 3, required: true },  // 6+ months of statements
            averageBankBalance: { points: 4, required: true },
            revenueHistory: { points: 3, required: true },
            taxReturns: { points: 3, required: true },
            financialStatements: { points: 2, required: false },
            collateral: { points: 2, required: false },
            w2Employees: { points: 1, required: false }
        },

        // Time in business thresholds
        timeInBusinessThresholds: {
            excellent: 24,        // 2+ years (most SBA loans)
            good: 12,             // 1+ year
            fair: 6,              // 6+ months
            poor: 0               // Under 6 months
        },

        // Minimum bank balance recommendations
        bankBalanceThresholds: {
            excellent: 50000,
            good: 25000,
            fair: 10000,
            poor: 5000
        },

        // Revenue requirements for various loan types
        revenueRequirements: {
            sba7a: 100000,        // Annual revenue
            sbaMicroloan: 50000,
            termLoan: 75000,
            lineOfCredit: 50000
        }
    },

    // ==========================================================================
    // BUSINESS CREDIT (Combined Bureau Scores)
    // ==========================================================================
    businessCredit: {
        weight: 25,
        maxPoints: 25,

        elements: {
            dnbRegistered: { points: 2, required: true },
            paydexScore: { points: 4, required: true },
            experianProfile: { points: 2, required: true },
            equifaxProfile: { points: 2, required: true },
            tradelinesReporting: { points: 3, required: true },
            noDerogatory: { points: 2, required: true },
            // Vendor accounts reporting to bureaus
            vendorAccounts: { points: 10, required: true }  // Up to 10 points for vendor coverage
        },

        // Minimum tradelines for strong profile
        minimumTradelines: {
            minimum: 3,
            recommended: 5,
            strong: 8
        },

        // Vendor account scoring (Bureau Distribution)
        // Points per vendor account per bureau (first 3 per bureau count)
        vendorScoring: {
            pointsPerVendorPerBureau: 1.11,  // ~3.33 points per bureau when 3 vendors (10 total for all 3 bureaus)
            maxVendorsPerBureau: 3,
            bureaus: ['Experian', 'Equifax', 'D&B']
        }
    },


    // ==========================================================================
    // APPLICATION PROCESS
    // ==========================================================================
    applicationProcess: {
        weight: 10,
        maxPoints: 10,
        totalSteps: 4,

        steps: {
            documentsReady: { points: 2.5 },
            applicationSubmitted: { points: 2.5 },
            followUp: { points: 2.5 },
            negotiation: { points: 2.5 }
        }
    },

    // ==========================================================================
    // OVERALL FUNDABILITY THRESHOLDS
    // ==========================================================================
    overallThresholds: {
        excellent: 80,          // 80-100: Excellent fundability
        good: 60,               // 60-79: Good fundability
        fair: 40,               // 40-59: Fair - needs improvement
        poor: 0                 // 0-39: Poor - significant work needed
    },

    // Recommendation triggers
    recommendationTriggers: {
        lowPersonalCredit: 650,
        lowPaydex: 70,
        insufficientTradelines: 3,
        missingEIN: true,
        noBusinessBank: true,
        lessThan2YearsOld: true
    }
};

// ==========================================================================
// HELPER FUNCTIONS FOR SCORE CONVERSION
// ==========================================================================

/**
 * Convert personal credit score (300-850) to points
 * @param {number} score - FICO score
 * @param {number} maxPoints - Maximum points for this category
 * @returns {number} Points earned
 */
export const convertPersonalCreditToPoints = (score, maxPoints = 10) => {
    const { min, max } = CREDIT_STANDARDS.personalCredit.scoreRange;
    const normalized = (score - min) / (max - min);
    return Math.max(0, Math.min(maxPoints, normalized * maxPoints));
};

/**
 * Convert PAYDEX score (0-100) to points
 * @param {number} score - PAYDEX score
 * @param {number} maxPoints - Maximum points for this category
 * @returns {number} Points earned
 */
export const convertPaydexToPoints = (score, maxPoints = 10) => {
    const { min, max } = CREDIT_STANDARDS.dnbPaydex.scoreRange;
    const normalized = (score - min) / (max - min);
    return Math.max(0, Math.min(maxPoints, normalized * maxPoints));
};

/**
 * Get fundability tier based on overall percentage
 * @param {number} percentage - Overall fundability percentage (0-100)
 * @returns {string} Tier name
 */
export const getFundabilityTier = (percentage) => {
    const { excellent, good, fair } = CREDIT_STANDARDS.overallThresholds;
    if (percentage >= excellent) return 'Excellent';
    if (percentage >= good) return 'Good';
    if (percentage >= fair) return 'Fair';
    return 'Needs Improvement';
};

/**
 * Check if personal credit score meets SBA requirements
 * @param {number} score - FICO score
 * @param {string} loanType - Type of SBA loan
 * @returns {boolean} Whether score meets requirement
 */
export const meetsSBARequirement = (score, loanType = 'sba7a') => {
    const requirement = CREDIT_STANDARDS.personalCredit.sbaRequirements[loanType];
    return score >= requirement;
};

export default CREDIT_STANDARDS;
