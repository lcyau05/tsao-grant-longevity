// import { IGrant, GrantPreference, GrantRecommendation } from "../types";

// export function recommendGrants(
//     grants: IGrant[],
//     pref: GrantPreference
// ): GrantRecommendation[] {
//     const scored = grants.map(grant => scoreGrant(grant, pref));

//     return scored
//         .filter(r => r.score > 0)
//         .sort((a, b) => b.score - a.score);
// }

// function scoreGrant(
//     grant: IGrant,
//     pref: GrantPreference
// ): GrantRecommendation {
//     let score = 0;
//     const reasons: string[] = [];

//     // 🎯 Issue area matching (fuzzy)
//     if (pref.issueAreas.length > 0 && grant.categories) {
//         const matches = pref.issueAreas.filter((area) =>
//             grant.categories.some((cat) =>
//                 cat.toLowerCase().includes(area.toLowerCase())
//             )
//         );
//         score += matches.length * 3;
//     }

//     /* 1️⃣ OUTCOME ALIGNMENT (highest weight) */
//     const outcomeMatches = grant.kpis.filter(kpi =>
//         pref.kpis.includes(kpi)
//     );

//     if (outcomeMatches.length > 0) {
//         score += outcomeMatches.length * 25;
//         reasons.push(
//             `Supports your outcomes: ${outcomeMatches
//                 .map(humanize)
//                 .join(", ")}`
//         );
//     } else {
//         score -= 20;
//     }

//     /* 2️⃣ FUNDING ADEQUACY (sustainability check) */
//     if (pref.minFunding && grant.fundingCap) {
//         if (grant.fundingCap >= pref.minFunding) {
//             score += 20;
//             reasons.push("Funding amount meets your minimum needs");
//         } else {
//             score -= 15;
//             reasons.push("Funding amount may be insufficient");
//         }
//     }

//     /* 3️⃣ URGENCY MATCH */
//     if (pref.urgency === "urgent") {
//         if (grant.info.whenToApply.applicationType === "open_all_year") {
//             score += 15;
//             reasons.push("Accepts applications year-round (urgent friendly)");
//         } else {
//             score -= 5;
//         }
//     } else {
//         score += 5;
//     }

//     /* 4️⃣ ADMINISTRATIVE BURDEN (realism factor) */
//     const adminLoad = estimateAdminLoad(grant);

//     if (adminLoad === pref.adminTolerance) {
//         score += 15;
//         reasons.push("Administrative effort matches your capacity");
//     } else if (adminLoad === "high" && pref.adminTolerance === "low") {
//         score -= 20;
//         reasons.push("Requires heavy documentation and reporting");
//     }

//     /* 5️⃣ FOLLOW-UP WILLINGNESS */
//     if (pref.followUpWillingness) {
//         score += 5;
//     } else if (adminLoad === "high") {
//         score -= 10;
//     }

//     return { grant, score, reasons };
// }

// /* ---------------- HELPERS ---------------- */

// function estimateAdminLoad(grant: IGrant): "low" | "medium" | "high" {
//     const text = [
//         grant.info.about,
//         grant.info.whoCanApply,
//         grant.info.whenToApply.rawText,
//     ]
//         .join(" ")
//         .toLowerCase();

//     // High admin burden
//     if (
//         text.includes("audit") ||
//         text.includes("budget form") ||
//         text.includes("kpi") ||
//         text.includes("report") ||
//         text.includes("supporting documents") ||
//         text.includes("endorsement")
//     ) {
//         return "high";
//     }

//     // Medium admin burden
//     if (
//         text.includes("proposal") ||
//         text.includes("eligibility") ||
//         text.includes("assessment")
//     ) {
//         return "medium";
//     }

//     // Default: low admin
//     return "low";
// }


// function humanize(str: string) {
//     return str.replace(/_/g, " ");
// }

import { IGrant, GrantPreference, GrantRecommendation } from "../types";
const MIN_RECOMMENDATION_SCORE = 0;
export function recommendGrants(
    grants: IGrant[],
    pref: GrantPreference
): GrantRecommendation[] {
    return grants
        .map(grant => scoreGrant(grant, pref))
        .filter(r => r.score >= MIN_RECOMMENDATION_SCORE)
        .sort((a, b) => b.score - a.score);
}

const BENEFICIARY_KEYWORDS: Record<string, string[]> = {
    Youth: ["youth", "student", "young"],
    Elderly: ["elderly", "senior", "ageing"],
    Caregivers: ["caregiver", "care giver", "care"],
    Families: ["family", "parent", "children"],
    "General community": ["community", "citizen", "volunteer"],
};


/* ================= CORE SCORER ================= */

function scoreGrant(
    grant: IGrant,
    pref: GrantPreference
): GrantRecommendation {
    let score = 0;
    let hasCoreMatch = false;
    const reasons: string[] = [];

    /* 0️⃣ ISSUE AREA / MISSION FIT */
    if (pref.issueAreas.length > 0) {
        const categoryMatches = grant.categories?.filter(cat =>
            pref.issueAreas.includes(cat)
        ) ?? [];

        if (categoryMatches.length > 0) {
            hasCoreMatch = true;
            score += categoryMatches.length * 20;
            reasons.push(`Matches grant categories: ${categoryMatches.join(", ")}`);
        } else {
            // fallback to keyword scan
            const grantText = [
                grant.title,
                grant.info.about,
                grant.info.whoCanApply ?? "",
            ]
                .join(" ")
                .toLowerCase();

            const keywordMatches = pref.issueAreas.filter(area => {
                const keywords = ISSUE_KEYWORDS[area] ?? [];
                return keywords.some(k => grantText.includes(k));
            });

            if (keywordMatches.length > 0) {
                hasCoreMatch = true;
                score += keywordMatches.length * 10;
                reasons.push(`Textually aligns with: ${keywordMatches.join(", ")}`);
            }
        }
    }

    /* 🧑‍🤝‍🧑 BENEFICIARY CONTEXT (DERIVED, VERY LIGHT BOOST) */
    if (pref.beneficiaries?.length) {
        const grantText = `${grant.title} ${grant.info.about}`.toLowerCase();

        const matches = pref.beneficiaries.filter(b => {
            const keywords = BENEFICIARY_KEYWORDS[b] ?? [];
            return keywords.some(k => grantText.includes(k));
        });

        if (matches.length > 0) {
            score += matches.length * 5;
            reasons.push(`Likely serves: ${matches.join(", ")}`);
        }
    }


    /* 1️⃣ OUTCOME / KPI ALIGNMENT */
    const outcomeMatches = grant.kpis.filter(kpi =>
        pref.kpis.includes(kpi)
    );

    if (outcomeMatches.length > 0) {
        score += outcomeMatches.length * 25;
        reasons.push(
            `Supports your outcomes: ${outcomeMatches
                .map(humanize)
                .join(", ")}`
        );
    } else {
        // score -= 15;
    }

    /* 2️⃣ FUNDING ADEQUACY */
    if (pref.minFunding && grant.fundingCap) {
        if (grant.fundingCap >= pref.minFunding) {
            score += 20;
            reasons.push("Funding amount meets your minimum needs");
        } else {
            score -= 15;
            reasons.push("Funding amount may be insufficient");
        }
    }

    /* 3️⃣ URGENCY & TIMING REALISM */
    if (isUrgencyCompatible(grant, pref)) {
        score += 15;
        reasons.push("Application timeline matches your urgency");
    } else {
        score -= 5;
        reasons.push("Application timeline may be too slow for urgent needs");
    }

    const adminLoad = grant.adminLoad;

    if (adminLoad === pref.adminTolerance) {
        score += 15;
        reasons.push("Administrative effort matches your capacity");
    } else if (adminLoad === "high" && pref.adminTolerance !== "high") {
        score -= 25;
        reasons.push("Heavy documentation and reporting required");
    } else if (adminLoad === "medium" && pref.adminTolerance === "low") {
        score -= 10;
        reasons.push("Moderate reporting effort required");
    }

    // /* 4️⃣ ADMINISTRATIVE BURDEN */
    // const adminLoad = estimateAdminLoad(grant);

    // if (adminLoad === pref.adminTolerance) {
    //     score += 15;
    //     reasons.push("Administrative effort matches your capacity");
    // } else if (adminLoad === "high" && pref.adminTolerance !== "high") {
    //     score -= 25;
    //     reasons.push("Heavy documentation and reporting required");
    // } else if (adminLoad === "medium" && pref.adminTolerance === "low") {
    //     score -= 10;
    //     reasons.push("Moderate reporting effort required");
    // }

    /* 5️⃣ FOLLOW-UP WILLINGNESS */
    if (!pref.followUpWillingness && adminLoad === "high") {
        score -= 10;
        reasons.push("Requires follow-up reporting you may not want");
    }

    /* 6️⃣ SUSTAINABILITY SIGNAL */
    if (grant.fundingCap && grant.fundingCap < 5000) {
        score -= 10;
        reasons.push("Smaller grant size may limit long-term sustainability");
    }

    // HARD REQUIREMENT ONLY IF USER SELECTED ISSUE AREAS
    if (pref.issueAreas.length > 0 && !hasCoreMatch) {
        score -= 20;
        reasons.push("Limited alignment with selected focus areas");
    }

    return { grant, score, reasons };
}

/* ================= HELPERS ================= */

function isUrgencyCompatible(
    grant: IGrant,
    pref: GrantPreference
): boolean {
    const when = grant.info.whenToApply;

    if (pref.urgency === "urgent") {
        if (when.applicationType === "open_all_year") return true;

        if (when.applicationType === "relative" && when.relative) {
            // urgent orgs can realistically prep ≤ 1 month
            return when.relative.amount <= 1;
        }

        return false;
    }

    return true;
}

// const ISSUE_KEYWORDS: Record<string, string[]> = {
//     "Community development": ["community", "citizen", "volunteer"],
//     "Youth development": ["youth", "young", "student"],
//     "Education & learning": ["education", "learning", "school", "training"],
//     "Health & wellbeing": ["health", "mental", "wellbeing"],
//     "Care & support services": ["care", "elderly", "support"],
// };

const ISSUE_KEYWORDS: Record<string, string[]> = {
    healthcare: ["health", "medical", "wellbeing"],
    mental_health: ["mental health", "psychological", "wellbeing"],
    ageing: ["ageing", "elderly", "senior"],
    disability: ["disability", "special needs"],
    caregivers: ["caregiver", "care giver", "care support"],

    community: ["community", "citizen", "volunteer", "civic"],
    family: ["family", "parent", "children"],
    youth: ["youth", "young", "student"],
    low_income: ["low-income", "financial assistance", "poverty"],

    education: ["education", "learning", "school", "training"],
    employment: ["employment", "workforce", "job", "skills"],

    social_innovation: ["innovation", "pilot", "new approach"],
    digitalisation: ["digital", "technology", "automation"],
    capacity_building: ["capacity building", "organisational", "governance"],
};


// function estimateAdminLoad(grant: IGrant): "low" | "medium" | "high" {
//     const text = [
//         grant.info.about,
//         grant.info.whoCanApply,
//         grant.info.whenToApply.rawText,
//         grant.info.howToApply ?? ""
//     ]
//         .join(" ")
//         .toLowerCase();

//     if (
//         text.includes("audit") ||
//         text.includes("budget form") ||
//         text.includes("report") ||
//         text.includes("endorsement") ||
//         text.includes("supporting documents")
//     ) {
//         return "high";
//     }

//     if (
//         text.includes("proposal") ||
//         text.includes("assessment") ||
//         text.includes("eligibility")
//     ) {
//         return "medium";
//     }

//     return "low";
// }

function humanize(str: string) {
    return str.replace(/_/g, " ");
}

