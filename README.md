# Ticket Booking System

A full-stack ticket booking system with Go backend and React TypeScript frontend.

## Backend (Go)

### Prerequisites
- Go 1.19+
- SQLite (automatically handled)

### Running the Backend
```bash
# Install dependencies
go mod tidy

# Run the server
go run cmd/api/main.go
```

The API will be available at `http://localhost:8080`

### API Endpoints
- `GET /api/matches/:matchId/tickets` - Get available tickets for a match
- `POST /api/tickets/:ticketId/purchase` - Purchase a ticket

## Frontend (React TypeScript)

### Prerequisites
- Node.js 16+
- npm or yarn

### Running the Frontend
```bash
# Install dependencies
npm install

# Start development server
npm start
```

The frontend will be available at `http://localhost:3000`

### Features
- Browse available matches
- Select ticket types (VVIP, VIP, Regular)
- Interactive seat map
- Checkout process
- Responsive design with Tailwind CSS

## Project Structure

```
├── cmd/api/           # Go API entry point
├── internal/          # Go internal packages
│   ├── config/        # Configuration
│   ├── controllers/   # HTTP handlers
│   ├── models/        # Data models
│   ├── repositories/  # Data access layer
│   └── services/      # Business logic
├── src/               # React frontend
│   ├── components/    # React components
│   ├── pages/         # Page components
│   ├── services/      # API services
│   └── types/         # TypeScript types
└── public/            # Static assets
```

## Development

1. Start the Go backend: `go run cmd/api/main.go`
2. Start the React frontend: `npm start`
3. Open `http://localhost:3000` in your browser

The frontend will proxy API requests to the backend running on port 8080.