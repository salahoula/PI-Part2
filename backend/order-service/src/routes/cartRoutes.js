const express = require('express');
const { body, validationResult } = require('express-validator');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Récupère le panier de l'utilisateur
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 */
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      cart = new Cart({ userId: req.user.userId, items: [] });
      await cart.save();
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du panier' });
  }
});

/**
 * @swagger
 * /api/cart/items:
 *   post:
 *     summary: Ajoute un produit au panier
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - name
 *               - price
 *               - quantity
 */
router.post('/items', auth, [
  body('productId').notEmpty(),
  body('name').notEmpty(),
  body('price').isFloat({ min: 0 }),
  body('quantity').isInt({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      cart = new Cart({ userId: req.user.userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId === req.body.productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += req.body.quantity;
    } else {
      cart.items.push(req.body);
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout au panier' });
  }
});

/**
 * @swagger
 * /api/cart/items/{productId}:
 *   delete:
 *     summary: Supprime un produit du panier
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 */
router.delete('/items/:productId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Panier non trouvé' });
    }

    cart.items = cart.items.filter(item => item.productId !== req.params.productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du produit' });
  }
});

/**
 * @swagger
 * /api/cart/items/{productId}:
 *   put:
 *     summary: Met à jour la quantité d'un produit dans le panier
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 */
router.put('/items/:productId', auth, [
  body('quantity').isInt({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Panier non trouvé' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId === req.params.productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Produit non trouvé dans le panier' });
    }

    cart.items[itemIndex].quantity = req.body.quantity;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la quantité' });
  }
});

module.exports = router;
