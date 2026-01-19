package main

type RawGrant struct {
	URL     string `json:"url"`
	RawText string `json:"rawText"`
}

type WhenToApplyInfo struct {
	RawText         string `json:"rawText"`
	ApplicationType string `json:"applicationType"`
	DeadlineHint    string `json:"deadlineHint"`
}

type GrantInfo struct {
	About       string          `json:"about"`
	WhoCanApply string          `json:"whoCanApply"`
	WhenToApply WhenToApplyInfo `json:"whenToApply"`
	HowMuch     string          `json:"howMuchFunding"`
	HowToApply  string          `json:"howToApply"`
}

type ParsedGrant struct {
	URL        string    `json:"url"`
	Agency     string    `json:"agency"`
	Title      string    `json:"title"`
	Funding    string    `json:"funding"`
	Categories []string  `json:"categories"`
	Info       GrantInfo `json:"info"`
}
