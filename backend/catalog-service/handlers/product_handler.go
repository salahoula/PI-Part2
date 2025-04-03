package handlers

import (
	"catalog-service/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

var db *gorm.DB

func SetDB(database *gorm.DB) {
	db = database
}

func GetProducts(c *fiber.Ctx) error {
	var products []models.Product
	result := db.Preload("Category").Find(&products)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Erreur lors de la récupération des produits",
		})
	}

	return c.JSON(products)
}

func GetProduct(c *fiber.Ctx) error {
	id := c.Params("id")
	var product models.Product

	result := db.Preload("Category").First(&product, id)
	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{
			"message": "Produit non trouvé",
		})
	}

	return c.JSON(product)
}

func CreateProduct(c *fiber.Ctx) error {
	product := new(models.Product)
	if err := c.BodyParser(product); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Données invalides",
		})
	}

	result := db.Create(&product)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Erreur lors de la création du produit",
		})
	}

	return c.Status(201).JSON(product)
}

func UpdateProduct(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "ID invalide",
		})
	}

	product := new(models.Product)
	if err := c.BodyParser(product); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Données invalides",
		})
	}

	product.ID = uint(id)
	result := db.Save(&product)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Erreur lors de la mise à jour du produit",
		})
	}

	return c.JSON(product)
}

func DeleteProduct(c *fiber.Ctx) error {
	id := c.Params("id")
	result := db.Delete(&models.Product{}, id)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Erreur lors de la suppression du produit",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Produit supprimé avec succès",
	})
}
