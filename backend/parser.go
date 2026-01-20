package main

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"
)

func atoi(s string) int {
	v, err := strconv.Atoi(s)
	if err != nil {
		return 0
	}
	return v
}

// func extractHeader(lines []string) (string, string) {
// 	for i, line := range lines {
// 		if line == "INSTRUCTIONS" && i >= 2 {
// 			agency := lines[i-2]
// 			title := lines[i-1]

// 			// Handle (AEP) on its own line
// 			if strings.HasPrefix(title, "(") && i >= 3 {
// 				title = lines[i-2]
// 				agency = lines[i-3]
// 			}

// 			return agency, title
// 		}
// 	}
// 	return "", ""
// }

func extractHeader(lines []string) (string, string) {
	// 1️⃣ Try instruction-based anchor (best case)
	for i, line := range lines {
		l := strings.ToLower(strings.TrimSpace(line))
		if strings.Contains(l, "instruction") && i >= 2 {
			title := strings.TrimSpace(lines[i-1])
			agency := strings.TrimSpace(lines[i-2])

			if len(title) < 5 && i >= 3 {
				title = strings.TrimSpace(lines[i-2])
				agency = strings.TrimSpace(lines[i-3])
			}
			return agency, title
		}
	}

	// 2️⃣ FALLBACK: use first non-empty, non-section lines
	var candidates []string
	for _, line := range lines {
		l := strings.ToLower(line)
		if strings.Contains(l, "about this grant") ||
			strings.Contains(l, "who can apply") ||
			strings.Contains(l, "how to apply") {
			break
		}
		if len(line) > 5 {
			candidates = append(candidates, line)
		}
		if len(candidates) >= 2 {
			break
		}
	}

	if len(candidates) >= 2 {
		return candidates[0], candidates[1]
	}

	return "", ""
}

func isSectionHeader(line string) string {
	l := strings.ToLower(line)

	switch {
	case strings.Contains(l, "about this grant"):
		return "about"
	case strings.Contains(l, "who can apply"):
		return "whoCanApply"
	case strings.Contains(l, "when"):
		return "whenToApply"
	case strings.Contains(l, "how much"):
		return "howMuchFunding"
	case strings.Contains(l, "how to apply"):
		return "howToApply"
	default:
		return ""
	}
}

func extractStatus(rawText string) string {
	if strings.Contains(strings.ToLower(rawText), "applications closed") {
		return "Closed"
	}
	return "Open"
}

func extractFunding(text string) string {
	re := regexp.MustCompile(`(Up to\s+S?\$[\d,]+[^.\n]*|capped at\s+\$[\d,]+)`)
	return re.FindString(text)
}

func extractCategories(text string) []string {
	keywords := []string{
		"Care", "Community", "Youth", "Health",
		"Education", "Arts", "Social Service",
		"Heritage", "Sport",
	}

	found := []string{}
	for _, k := range keywords {
		if strings.Contains(text, k) {
			found = append(found, k)
		}
	}
	return found
}

func extractFundingCap(text string) *int {
	re := regexp.MustCompile(`\$([\d,]+)`)
	m := re.FindStringSubmatch(text)
	if len(m) != 2 {
		return nil
	}
	n := strings.ReplaceAll(m[1], ",", "")
	val, err := strconv.Atoi(n)
	if err != nil {
		return nil
	}
	return &val
}

func normalizeWhenToApply(text string) WhenToApplyInfo {
	l := strings.ToLower(text)

	info := WhenToApplyInfo{
		RawText: text,
	}

	switch {
	case strings.Contains(l, "all year"):
		info.ApplicationType = "open_all_year"

	case strings.Contains(l, "rolling"):
		info.ApplicationType = "rolling"

	case strings.Contains(l, "month") && strings.Contains(l, "before"):
		info.ApplicationType = "relative"
		re := regexp.MustCompile(`(\d+)\s+month`)
		if m := re.FindStringSubmatch(l); len(m) == 2 {
			info.Relative = &RelativeDeadline{
				Amount:    atoi(m[1]),
				Unit:      "month",
				Reference: "project_start_date",
			}
		}

	case regexp.MustCompile(`\d{4}`).MatchString(l):
		info.ApplicationType = "fixed_date"
		info.DeadlineHint = text

	default:
		info.ApplicationType = "unknown"
	}

	return info
}

func inferKPIs(text string) []string {
	l := strings.ToLower(text)
	kpis := []string{}

	if strings.Contains(l, "volunteer") {
		kpis = append(kpis, "volunteer_engagement")
	}
	if strings.Contains(l, "community") {
		kpis = append(kpis, "community_engagement")
	}
	if strings.Contains(l, "youth") {
		kpis = append(kpis, "youth_outreach")
	}
	if strings.Contains(l, "health") {
		kpis = append(kpis, "health_outcomes")
	}
	return kpis
}

func cleanHowToApply(text string) string {
	cutMarkers := []string{
		"OurSG Grants portal",
		"Privacy",
		"Terms of Use",
		"©",
		"Last Updated",
	}

	for _, marker := range cutMarkers {
		if idx := strings.Index(text, marker); idx != -1 {
			text = text[:idx]
		}
	}

	return strings.TrimSpace(text)
}

func inferAdminLoad(text string) string {
	l := strings.ToLower(text)

	if strings.Contains(l, "audit") ||
		strings.Contains(l, "budget form") ||
		strings.Contains(l, "endorsement") ||
		strings.Contains(l, "supporting documents") ||
		strings.Contains(l, "report") {
		return "high"
	}

	if strings.Contains(l, "proposal") ||
		strings.Contains(l, "assessment") ||
		strings.Contains(l, "eligibility") {
		return "medium"
	}

	return "low"
}

func ParseGrant(raw RawGrant) *ParsedGrant {
	text := strings.ToLower(raw.RawText)

	// 🚫 1. Empty or blocked pages
	if raw.RawText == "" ||
		strings.Contains(text, "dosarrest") ||
		strings.Contains(text, "too many requests") {
		fmt.Println("🚫 DOSARREST PAGE:", raw.URL)
		return nil
	}

	// 🚫 2. Closed grants
	// if strings.Contains(text, "applications closed") {
	// 	return nil
	// }

	lines := cleanLines(raw.RawText)
	agency, title := extractHeader(lines)

	sections := map[string]string{}
	current := ""

	for _, line := range lines {
		if key := isSectionHeader(line); key != "" {
			current = key
			continue
		}
		if current != "" {
			sections[current] += line + " "
		}
	}

	// if agency == "" || title == "" {
	// 	fmt.Println("❌ Header not found for:", raw.URL)
	// 	return nil
	// }

	if agency == "" {
		agency = "Unknown Agency"
	}
	if title == "" {
		title = "Untitled Grant"
	}

	adminText := sections["about"] +
		sections["whoCanApply"] +
		sections["howToApply"]

	return &ParsedGrant{
		URL:        raw.URL,
		Agency:     agency,
		Title:      title,
		Status:     extractStatus(raw.RawText),
		Funding:    extractFunding(raw.RawText),
		FundingCap: extractFundingCap(raw.RawText),
		Categories: extractCategories(raw.RawText),
		KPIs:       inferKPIs(raw.RawText),
		adminLoad:  inferAdminLoad(adminText),
		Info: GrantInfo{
			About:       sections["about"],
			WhoCanApply: sections["whoCanApply"],
			WhenToApply: normalizeWhenToApply(sections["whenToApply"]),
			HowMuch:     sections["howMuchFunding"],
			HowToApply:  cleanHowToApply(sections["howToApply"]),
		},
	}
}
