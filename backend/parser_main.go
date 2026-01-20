package main

// import (
// 	"encoding/json"
// 	"fmt"
// 	"os"
// )

// func main() {
// 	// 1️⃣ Read scraped data
// 	data, err := os.ReadFile("../scraper/scraped_grants.json")
// 	if err != nil {
// 		panic(err)
// 	}

// 	// 2️⃣ Parse raw grants
// 	var rawGrants []RawGrant
// 	if err := json.Unmarshal(data, &rawGrants); err != nil {
// 		panic(err)
// 	}

// 	fmt.Println("Loaded", len(rawGrants), "raw grants")

// 	parsed := []ParsedGrant{}

// 	// 3️⃣ Parse each grant independently
// 	for i, rg := range rawGrants {
// 		grant := ParseGrant(rg)

// 		if grant == nil {
// 			fmt.Printf("[%d] Skipped: %s\n", i+1, rg.URL)
// 			continue
// 		}

// 		parsed = append(parsed, *grant)
// 	}

// 	// 4️⃣ Write output ONLY if something parsed
// 	if len(parsed) == 0 {
// 		fmt.Println("⚠️ No grants parsed. Output file not written.")
// 		return
// 	}

// 	out, err := json.MarshalIndent(parsed, "", "  ")
// 	if err != nil {
// 		panic(err)
// 	}

// 	if err := os.WriteFile("parsed_grants.json", out, 0644); err != nil {
// 		panic(err)
// 	}

// 	fmt.Println("✅ Parsed", len(parsed), "grants successfully")
// }
