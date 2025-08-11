package services

import (
	"ticket-system/internal/models"
	"ticket-system/internal/repositories"
)

type TicketService struct {
	ticketRepo *repositories.TicketRepository
}

func NewTicketService(ticketRepo *repositories.TicketRepository) *TicketService {
	return &TicketService{ticketRepo: ticketRepo}
}

func (s *TicketService) CreateMatchTickets(matchID uint, allocation map[string]models.TicketAllocation) error {
	return s.ticketRepo.CreateTicketsForMatch(matchID, allocation)
}

func (s *TicketService) GetAvailableTickets(matchID uint, ticketType string) ([]models.Ticket, error) {
	return s.ticketRepo.GetAvailableTickets(matchID, ticketType)
}

func (s *TicketService) PurchaseTicket(userID, ticketID uint) (*models.Ticket, error) {
	return s.ticketRepo.PurchaseTicket(userID, ticketID)
}"
