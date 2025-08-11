package controllers

import (
	"net/http"
	"strconv"
	"ticket-system/internal/services"

	"github.com/gin-gonic/gin"
)

type TicketController struct {
	ticketService *services.TicketService
}

func NewTicketController(ticketService *services.TicketService) *TicketController {
	return &TicketController{ticketService: ticketService}
}

func (c *TicketController) GetAvailableTickets(ctx *gin.Context) {
	matchID, err := strconv.ParseUint(ctx.Param("matchId"), 10, 32)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid match ID"})
		return
	}

	ticketType := ctx.Query("type")

	tickets, err := c.ticketService.GetAvailableTickets(uint(matchID), ticketType)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, tickets)
}

func (c *TicketController) PurchaseTicket(ctx *gin.Context) {
	userID := ctx.GetUint("userID") // Assuming userID is set by auth middleware
	
	ticketID, err := strconv.ParseUint(ctx.Param("ticketId"), 10, 32)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid ticket ID"})
		return
	}

	ticket, err := c.ticketService.PurchaseTicket(userID, uint(ticketID))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, ticket)
}
