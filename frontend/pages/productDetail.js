import React, { useState, useEffect } from 'react';

const ProductDetail = ({ productId }) => {
  // State pour gérer l'affichage du produit
  const [product, setProduct] = useState(null);

  // Charger les détails du produit (vous pouvez remplacer cet appel avec une vraie API ou un fetch)
  useEffect(() => {
    // Remplacer ceci par un appel API réel pour récupérer les données du produit par `productId`
    const fetchedProduct = {
      id: productId,
      name: 'Produit exemple',
      price: 100,
      description: 'Description du produit',
    };

    setProduct(fetchedProduct);
  }, [productId]);

  const addToCart = (product) => {
    try {
      if (!product || !product.id) {
        alert('Produit invalide');
        return;
      }

      // Récupérer le panier existant depuis le localStorage
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

      // Vérifier si le produit existe déjà dans le panier
      const existingProduct = storedCart.find(item => item.id === product.id);

      if (existingProduct) {
        // Augmenter la quantité si le produit est déjà dans le panier
        existingProduct.quantity += 1;
      } else {
        // Ajouter le produit avec une quantité de 1 s'il n'est pas dans le panier
        storedCart.push({ ...product, quantity: 1 });
      }

      // Sauvegarder le panier mis à jour dans localStorage
      localStorage.setItem('cart', JSON.stringify(storedCart));

      // Message de confirmation
      alert('Produit ajouté au panier');
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier :', error);
      alert('Une erreur est survenue lors de l\'ajout au panier');
    }
  };

  if (!product) return <div>Chargement du produit...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Prix : {product.price}€</p>
      <button onClick={() => addToCart(product)}>Ajouter au panier</button>
    </div>
  );
};

export default ProductDetail;
