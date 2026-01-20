# FindGrant

A comprehensive grant discovery and recommendation platform that helps users find relevant funding opportunities through intelligent matching and personalized recommendations.

## About

FindGrant is a full-stack application that scrapes grant data from various sources, processes it through AI-powered analysis, and provides users with personalized grant recommendations based on their project profiles and needs.

## Architecture

The project consists of three main components:

### Frontend (React/TypeScript)
A modern web application built with React, TypeScript, and Mantine UI that provides an intuitive interface for users to discover and explore grant opportunities.

### Backend (Go)
A REST API server written in Go that serves processed grant data and handles data processing operations.

### Scraper (Node.js)
A web scraping service built with Node.js and Playwright that collects grant information from various government and foundation websites.

## Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Mantine v6** - Component library
- **React Router** - Client-side routing
- **ApexCharts** - Data visualization
- **Day.js** - Date manipulation
- **Tabler Icons** - Icon library

### Backend
- **Go 1.25.5** - Programming language
- **Standard library** - HTTP server and JSON handling

### Scraper
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Playwright** - Browser automation for scraping

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v16 or higher) - https://nodejs.org/
- **Go** (v1.19 or higher) - https://golang.org/dl/
- **Git** - https://git-scm.com/
- **Yarn** (optional but recommended) - https://yarnpkg.com/

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd findgrant
   ```

2. **Install frontend dependencies**
   ```bash
   cd crowdup
   yarn install
   # or
   npm install
   ```

3. **Install scraper dependencies**
   ```bash
   cd ../scraper
   npm install
   ```

4. **The backend requires no additional dependencies** (uses only Go standard library)

## Usage

### Running the Scraper

The scraper collects grant data from external sources:

```bash
cd scraper
npm start
# or for development
node index.js
```

**Endpoints:**
- `GET /` - Health check
- `GET /scrape` - Trigger scraping process

The scraper will save data to `scraped_grants.json`.

### Running the Backend

The backend serves processed grant data:

```bash
cd backend
go run main.go
```

**API Endpoints:**
- `GET /grants` - Returns all parsed grants as JSON

Server runs on `http://localhost:8081`

### Running the Frontend

Start the development server:

```bash
cd crowdup
yarn dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
cd crowdup
yarn build
# or
npm run build
```

## Project Structure

```
findgrant/
├── crowdup/                 # Frontend React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── sections/       # Home page sections
│   │   ├── utils/          # Utility functions
│   │   ├── types/          # TypeScript type definitions
│   │   └── theme/          # UI theme configuration
│   ├── public/             # Static assets
│   └── package.json
├── backend/                # Go API server
│   ├── main.go            # Server entry point
│   ├── models.go          # Data structures
│   ├── parser.go          # Data parsing logic
│   ├── utils.go           # Utility functions
│   └── parsed_grants.json # Processed grant data
├── scraper/               # Node.js scraping service
│   ├── index.js           # Express server
│   ├── scrapeOurSG.js     # Scraping logic
│   ├── parser.js          # Data parsing
│   └── scraped_grants.json # Raw scraped data
└── README.md
```

## API Documentation

### Backend API

#### GET /grants

Returns a JSON array of parsed grant objects.

**Response Format:**
```json
[
  {
    "url": "https://example.com/grant",
    "agency": "Government Agency",
    "title": "Grant Title",
    "status": "Open",
    "funding": "$50,000",
    "fundingCap": 50000,
    "categories": ["Education", "Technology"],
    "kpis": ["Impact", "Sustainability"],
    "info": {
      "about": "Grant description...",
      "whoCanApply": "Eligibility criteria...",
      "whenToApply": {
        "rawText": "Applications due...",
        "applicationType": "Rolling",
        "deadlineHint": "Ongoing"
      },
      "howMuch": "Up to $50,000",
      "howToApply": "Application instructions..."
    }
  }
]
```

## Development

### Frontend Development

```bash
cd crowdup
node index.js       # Start dev server
# yarn dev          # Start dev server
# yarn build        # Build for production
# yarn lint         # Run ESLint
# yarn preview      # Preview production build
```

### Backend Development

```bash
cd backend
go run main.go    # Run server
go build         # Build binary
```

### Scraper Development

```bash
cd scraper
node index.js     # Run scraper server
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Authors

- Development Team - Tsao Foundation Hackathon Project
