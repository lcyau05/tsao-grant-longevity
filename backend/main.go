package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

var cachedGrants []ParsedGrant

func loadGrants() error {
	data, err := os.ReadFile("parsed_grants.json")
	if err != nil {
		return err
	}
	return json.Unmarshal(data, &cachedGrants)
}

func grantsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(cachedGrants)
}

func main() {
	// 1️⃣ Load already-parsed grants
	if err := loadGrants(); err != nil {
		log.Fatal("Failed to load parsed_grants.json:", err)
	}

	// 2️⃣ Register routes
	http.HandleFunc("/grants", grantsHandler)

	// 3️⃣ Start server
	fmt.Println("🚀 Backend running at http://localhost:8081/grants")
	log.Fatal(http.ListenAndServe(":8081", nil))
}
