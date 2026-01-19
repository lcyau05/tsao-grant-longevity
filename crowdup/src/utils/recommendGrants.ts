import { IGrant } from "../types";
import { GrantPreference } from "../types";
import { GrantRecommendation } from "../types";
import { scoreGrant } from "./grantScorer";

export function recommendGrants(
  grants: IGrant[],
  pref: GrantPreference
): GrantRecommendation[] {
  return grants
    .map(grant => scoreGrant(grant, pref))
    .filter(rec => rec.score > 0)
    .sort((a, b) => b.score - a.score);
}
