package main

import (
	"regexp"
	"strings"
)

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

func normalizeWhenToApply(text string) WhenToApplyInfo {
	l := strings.ToLower(text)

	info := WhenToApplyInfo{
		RawText: text,
	}

	switch {
	case strings.Contains(l, "open throughout the year"):
		info.ApplicationType = "open_all_year"
	case strings.Contains(l, "before"):
		info.ApplicationType = "deadline_based"
		info.DeadlineHint = text
	default:
		info.ApplicationType = "unknown"
	}

	return info
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
		Status:     extractStatus(raw.RawText), // ✅ ADD THIS
		Funding:    extractFunding(raw.RawText),
		Categories: extractCategories(raw.RawText),
		Info: GrantInfo{
			About:       sections["about"],
			WhoCanApply: sections["whoCanApply"],
			WhenToApply: normalizeWhenToApply(sections["whenToApply"]),
			HowMuch:     sections["howMuchFunding"],
			HowToApply:  sections["howToApply"],
		},
	}
}
