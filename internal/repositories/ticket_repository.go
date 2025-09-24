package repositories

import (
	"errors"
	"strconv"
	"time"
	"ticket-system/internal/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type TicketRepository struct {
	db *gorm.DB
}

func NewTicketRepository(db *gorm.DB) *TicketRepository {
	return &TicketRepository{db: db}
}

func (r *TicketRepository) CreateTicketsForMatch(matchID uint, ticketAllocation map[string]models.TicketAllocation) error {
	tickets := make([]models.Ticket, 0)

	for ticketType, allocation := range ticketAllocation {
		for i := 0; i < allocation.Count; i++ {
			tickets = append(tickets, models.Ticket{
				MatchID:    matchID,
				Type:       ticketType,
				SeatNumber: generateSeatNumber(ticketType, i+1),
				Price:      allocation.Price,
				Status:     "available",
			})
		}
	}

	return r.db.Create(&tickets).Error
}

func (r *TicketRepository) GetAvailableTickets(matchID uint, ticketType string) ([]models.Ticket, error) {
	var tickets []models.Ticket
	err := r.db.Where("match_id = ? AND type = ? AND status = ?", matchID, ticketType, "available").Find(&tickets).Error
	return tickets, err
}

func (r *TicketRepository) PurchaseTicket(userID, ticketID uint) (*models.Ticket, error) {
	var ticket models.Ticket
	
	// Start transaction
	err := r.db.Transaction(func(tx *gorm.DB) error {
		if err := tx.First(&ticket, ticketID).Error; err != nil {
			return err
		}

		if ticket.Status != "available" {
			return errors.New("ticket is not available")
		}

		ticket.Status = "sold"
		ticket.UserID = &userID
		ticket.PurchaseAt = time.Now()
		ticket.QRCode = generateQRCode(ticketID)

		return tx.Save(&ticket).Error
	})

	return &ticket, err
}

func generateSeatNumber(ticketType string, index int) string {
	return ticketType + "-" + strconv.Itoa(index)
}

func generateQRCode(ticketID uint) string {
	// Implement QR code generation logic
	return "qr-" + strconv.Itoa(int(ticketID)) + "-" + uuid.New().String()
}
