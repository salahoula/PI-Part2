package handlers

import (
	"catalog-service/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

// GetCategories godoc
// @Summary Liste toutes les catégories
// @Description Récupère la liste de toutes les catégories
// @Tags categories
// @Accept json
// @Produce json
// @Success 200 {array} models.Category
// @Router /categories [get]
func GetCategories(c *fiber.Ctx) error {
	var categories []models.Category
	result := db.Find(&categories)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Erreur lors de la récupération des catégories",
		})
	}

	return c.JSON(categories)
}

// GetCategory godoc
// @Summary Récupère une catégorie par son ID
// @Description Récupère les détails d'une catégorie spécifique
// @Tags categories
// @Accept json
// @Produce json
// @Param id path int true "ID de la catégorie"
// @Success 200 {object} models.Category
// @Router /categories/{id} [get]
func GetCategory(c *fiber.Ctx) error {
	id := c.Params("id")
	var category models.Category

	result := db.First(&category, id)
	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{
			"message": "Catégorie non trouvée",
		})
	}

	return c.JSON(category)
}

// CreateCategory godoc
// @Summary Crée une nouvelle catégorie
// @Description Crée une nouvelle catégorie dans le catalogue
// @Tags categories
// @Accept json
// @Produce json
// @Param category body models.Category true "Informations de la catégorie"
// @Success 201 {object} models.Category
// @Router /categories [post]
func CreateCategory(c *fiber.Ctx) error {
	category := new(models.Category)
	if err := c.BodyParser(category); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Données invalides",
		})
	}

	result := db.Create(&category)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Erreur lors de la création de la catégorie",
		})
	}

	return c.Status(201).JSON(category)
}

// UpdateCategory godoc
// @Summary Met à jour une catégorie
// @Description Met à jour les informations d'une catégorie existante
// @Tags categories
// @Accept json
// @Produce json
// @Param id path int true "ID de la catégorie"
// @Param category body models.Category true "Informations de la catégorie"
// @Success 200 {object} models.Category
// @Router /categories/{id} [put]
func UpdateCategory(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "ID invalide",
		})
	}

	category := new(models.Category)
	if err := c.BodyParser(category); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Données invalides",
		})
	}

	category.ID = uint(id)
	result := db.Save(&category)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Erreur lors de la mise à jour de la catégorie",
		})
	}

	return c.JSON(category)
}

// DeleteCategory godoc
// @Summary Supprime une catégorie
// @Description Supprime une catégorie du catalogue
// @Tags categories
// @Accept json
// @Produce json
// @Param id path int true "ID de la catégorie"
// @Success 200 {object} map[string]string
// @Router /categories/{id} [delete]
func DeleteCategory(c *fiber.Ctx) error {
	id := c.Params("id")
	result := db.Delete(&models.Category{}, id)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Erreur lors de la suppression de la catégorie",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Catégorie supprimée avec succès",
	})
}
