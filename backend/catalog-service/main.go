package main

import (
	"catalog-service/config"
	"catalog-service/handlers"
	"catalog-service/models"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/swagger"
)

// @title Catalog Service API
// @version 1.0
// @description API pour la gestion du catalogue de produits
// @host localhost:3002
// @BasePath /api
func main() {
	// Initialisation de la base de données
	db, err := config.InitDB()
	if err != nil {
		log.Fatal("Erreur de connexion à la base de données:", err)
	}

	// Auto-migration des modèles
	db.AutoMigrate(&models.Product{}, &models.Category{})

	app := fiber.New()

	// Middleware
	app.Use(cors.New())
	app.Use(logger.New())

	// Documentation Swagger
	app.Get("/swagger/*", swagger.HandlerDefault)

	// Routes API
	api := app.Group("/api")

	// Routes produits
	products := api.Group("/products")
	products.Get("/", handlers.GetProducts)
	products.Get("/:id", handlers.GetProduct)
	products.Post("/", handlers.CreateProduct)
	products.Put("/:id", handlers.UpdateProduct)
	products.Delete("/:id", handlers.DeleteProduct)

	// Routes catégories
	categories := api.Group("/categories")
	categories.Get("/", handlers.GetCategories)
	categories.Get("/:id", handlers.GetCategory)
	categories.Post("/", handlers.CreateCategory)
	categories.Put("/:id", handlers.UpdateCategory)
	categories.Delete("/:id", handlers.DeleteCategory)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3002"
	}

	log.Fatal(app.Listen(":" + port))
}
