package main

import "strings"

func cleanLines(text string) []string {
	lines := []string{}
	for _, l := range strings.Split(text, "\n") {
		l = strings.TrimSpace(l)
		if l != "" {
			lines = append(lines, l)
		}
	}
	return lines
}
