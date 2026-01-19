package main

import (
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

func extractHeader(lines []string) (string, string) {
	for i, line := range lines {
		if line == "INSTRUCTIONS" && i >= 2 {
			agency := lines[i-2]
			title := lines[i-1]

			// Handle (AEP) on its own line
			if strings.HasPrefix(title, "(") && i >= 3 {
				title = lines[i-2]
				agency = lines[i-3]
			}

			return agency, title
		}
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
	l := strings.ToLower(rawText)

	if strings.Contains(l, "applications closed") {
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

func ParseGrant(raw RawGrant) *ParsedGrant {
	text := strings.ToLower(raw.RawText)

	// 🚫 1. Empty or blocked pages
	if raw.RawText == "" ||
		strings.Contains(text, "dosarrest") ||
		strings.Contains(text, "too many requests") {
		return nil
	}

	// 🚫 2. Closed grants
	if strings.Contains(text, "applications closed") {
		return nil
	}

	if strings.Contains(text, "applications closed") {
		return nil
	}

	lines := cleanLines(raw.RawText)
	agency, title := extractHeader(lines)

	// 🚫 3. Invalid structure (VERY IMPORTANT)
	if agency == "" || title == "" {
		return nil
	}

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

	return &ParsedGrant{
		URL:        raw.URL,
		Agency:     agency,
		Title:      title,
		Status:     extractStatus(raw.RawText),
		Funding:    extractFunding(raw.RawText),
		FundingCap: extractFundingCap(raw.RawText),
		Categories: extractCategories(raw.RawText),
		KPIs:       inferKPIs(raw.RawText),
		Info: GrantInfo{
			About:       sections["about"],
			WhoCanApply: sections["whoCanApply"],
			WhenToApply: normalizeWhenToApply(sections["whenToApply"]),
			HowMuch:     sections["howMuchFunding"],
			HowToApply:  sections["howToApply"],
		},
	}
}
