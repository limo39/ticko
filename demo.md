# Ticket Booking System Demo

## What's Built

### Backend (Go)
- **API Server**: RESTful API with Gin framework
- **Database**: SQLite with GORM ORM
- **Models**: User, Match, Ticket with proper relationships
- **Endpoints**:
  - `GET /api/matches/:matchId/tickets` - Get available tickets
  - `POST /api/tickets/:ticketId/purchase` - Purchase a ticket

### Frontend (React TypeScript)
- **Pages**:
  - `MatchesPage` - Browse available matches
  - `TicketSelectionPage` - Select tickets and seats
  - `CheckoutPage` - Complete purchase
- **Components**:
  - `SeatMap` - Interactive seat selection
  - `TicketCard` - Individual ticket display
  - `TicketTypeSelector` - Filter by ticket type
- **Features**:
  - Responsive design with Tailwind CSS
  - Type-safe with TypeScript
  - React Router for navigation

## How to Run

### 1. Start the Backend
```bash
# In the root directory
go run cmd/api/main.go
```
The API will be available at `http://localhost:8080`

### 2. Start the Frontend
```bash
# Install dependencies (if not done)
npm install

# Start development server
npm start
```
The frontend will be available at `http://localhost:3000`

## Testing the System

### 1. Test Backend API Directly
```bash
# Get tickets for match ID 1
curl http://localhost:8080/api/matches/1/tickets

# Purchase ticket ID 1 for user ID 1
curl -X POST http://localhost:8080/api/tickets/1/purchase \
  -H "Content-Type: application/json" \
  -d '{"user_id": 1}'
```

### 2. Use the Frontend
1. Open `http://localhost:3000`
2. Browse available matches
3. Click "Book Tickets" on any match
4. Select ticket type (VVIP, VIP, Regular)
5. Choose seats from the seat map
6. Proceed to checkout
7. Fill in customer information
8. Complete purchase

## Key Features Implemented

✅ **Full-stack architecture** with Go backend and React frontend
✅ **Database integration** with SQLite and GORM
✅ **RESTful API** with proper error handling
✅ **Interactive UI** with seat selection
✅ **Type safety** with TypeScript
✅ **Responsive design** with Tailwind CSS
✅ **Routing** with React Router
✅ **State management** with React hooks

## Next Steps for Production

- Add user authentication and authorization
- Implement real payment processing
- Add email notifications
- Set up proper database (PostgreSQL)
- Add comprehensive error handling
- Implement seat locking during selection
- Add admin panel for match management
- Set up proper logging and monitoring