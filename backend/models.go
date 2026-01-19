package main

type RawGrant struct {
	URL     string `json:"url"`
	RawText string `json:"rawText"`
}

type RelativeDeadline struct {
	Amount    int    `json:"amount"`
	Unit      string `json:"unit"`
	Reference string `json:"reference"`
}

type WhenToApplyInfo struct {
	RawText         string            `json:"rawText"`
	ApplicationType string            `json:"applicationType"`
	DeadlineHint    string            `json:"deadlineHint,omitempty"`
	Relative        *RelativeDeadline `json:"relative,omitempty"`
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
	Status     string    `json:"status"`
	Funding    string    `json:"funding"`
	Categories []string  `json:"categories"`
	Info       GrantInfo `json:"info"`
}
