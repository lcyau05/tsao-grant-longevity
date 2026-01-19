import { IGrant } from "../types";
import { GrantPreference } from "../types";
import { GrantRecommendation } from "../types";

export function scoreGrant(
  grant: IGrant,
  pref: GrantPreference
): GrantRecommendation {
  let score = 0;
  const reasons: string[] = [];

  // 1️⃣ Issue area match (MOST IMPORTANT)
  const categoryMatches = grant.categories.filter(c =>
    pref.issueAreas.includes(c)
  );

  if (categoryMatches.length > 0) {
    score += categoryMatches.length * 30;
    reasons.push(`Matches your focus on ${categoryMatches.join(", ")}`);
  }

  // 2️⃣ Funding adequacy
  if (pref.minFunding && grant.fundingCap) {
    if (grant.fundingCap >= pref.minFunding) {
      score += 25;
      reasons.push("Funding amount meets your needs");
    } else {
      score -= 10;
    }
  }

  // 3️⃣ Deadline suitability
  if (pref.urgency === "urgent") {
    if (grant.info.whenToApply.applicationType === "open_all_year") {
      score += 15;
      reasons.push("Open all year — suitable for urgent funding");
    }
  } else {
    score += 5;
  }

  // 4️⃣ KPI alignment
  const kpiMatches = grant.kpis.filter(k =>
    pref.kpis.includes(k)
  );

  if (kpiMatches.length > 0) {
    score += kpiMatches.length * 10;
    reasons.push("Aligns with your desired outcomes");
  }

  return { grant, score, reasons };
}
