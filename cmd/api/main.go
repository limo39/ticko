package main

import (
	"ticket-system/internal/config"
	"ticket-system/internal/controllers"
	"ticket-system/internal/models"
	"ticket-system/internal/repositories"
	"ticket-system/internal/services"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {
	// Load configuration
	cfg := config.Load()

	// Database connection (using SQLite for testing)
	db, err := gorm.Open(sqlite.Open("ticket_system.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Auto migrate models
	db.AutoMigrate(&models.User{}, &models.Match{}, &models.Ticket{})

	// Initialize repositories
	ticketRepo := repositories.NewTicketRepository(db)

	// Initialize services
	ticketService := services.NewTicketService(ticketRepo)

	// Initialize controllers
	ticketController := controllers.NewTicketController(ticketService)

	// Setup router
	router := gin.Default()

	// Routes
	api := router.Group("/api")
	{
		api.GET("/matches/:matchId/tickets", ticketController.GetAvailableTickets)
		api.POST("/tickets/:ticketId/purchase", ticketController.PurchaseTicket)
	}

	// Start server
	router.Run(":" + cfg.Port)
}
