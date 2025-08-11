package models

import (
	"time"
)

type User struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Name      string    `json:"name" gorm:"not null"`
	Email     string    `json:"email" gorm:"unique;not null"`
	Password  string    `json:"-" gorm:"not null"`
	Role      string    `json:"role" gorm:"default:user"` // admin, staff, user
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime"`
}

type Match struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	HomeTeam  string    `json:"home_team" gorm:"not null"`
	AwayTeam  string    `json:"away_team" gorm:"not null"`
	Venue     string    `json:"venue" gorm:"not null"`
	DateTime  time.Time `json:"date_time" gorm:"not null"`
	Status    string    `json:"status" gorm:"default:scheduled"` // scheduled, ongoing, completed, cancelled
}

type Ticket struct {
	ID         uint      `json:"id" gorm:"primaryKey"`
	MatchID    uint      `json:"match_id" gorm:"not null"`
	Match      Match     `json:"match" gorm:"foreignKey:MatchID"`
	Type       string    `json:"type" gorm:"type:enum('VVIP','VIP','Regular');not null"`
	SeatNumber string    `json:"seat_number" gorm:"not null"`
	Price      float64   `json:"price" gorm:"not null"`
	Status     string    `json:"status" gorm:"type:enum('available','reserved','sold','used');default:available"`
	UserID     *uint     `json:"user_id"`
	User       *User     `json:"user,omitempty" gorm:"foreignKey:UserID"`
	PurchaseAt time.Time `json:"purchase_at,omitempty"`
	QRCode     string    `json:"qr_code,omitempty"`
}
