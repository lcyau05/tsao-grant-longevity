package main

import (
	"encoding/json"
	"fmt"
	"os"
)

func main() {
	data, err := os.ReadFile("../scraper/scraped_grants.json")
	if err != nil {
		panic(err)
	}

	var rawGrants []RawGrant
	if err := json.Unmarshal(data, &rawGrants); err != nil {
		panic(err)
	}

	parsed := []ParsedGrant{}
	for _, rg := range rawGrants {
		grant := ParseGrant(rg)
		if grant == nil {
			fmt.Println("Skipped:", rg.URL)
			continue
		}
		parsed = append(parsed, *grant)
	}

	out, _ := json.MarshalIndent(parsed, "", "  ")
	os.WriteFile("parsed_grants.json", out, 0644)

	fmt.Println("Parsed", len(parsed), "grants")
}
