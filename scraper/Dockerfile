# Official Playwright image (includes Chromium)
FROM mcr.microsoft.com/playwright:v1.41.0-jammy

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Cloud Run listens on 8080
EXPOSE 8080

# Start server
CMD ["node", "index.js"]
