import React, { useState, useEffect } from 'react';
import ProductCard from '../components/productcard';
import Navbar from '../components/navbar';

const initialProducts = [
  { id: 1, src: '/images/chargeur.jpeg', alt: 'Chargeur', price: '23DT' },
  { id: 2, src: '/images/poche1.jpeg', alt: 'Poche 1', price: '20DT' },
  { id: 3, src: '/images/poche2.jpeg', alt: 'Poche 2', price: '30DT' },
  { id: 4, src: '/images/adaptateur.jpeg', alt: 'Adaptateur', price: '25DT' },
  { id: 5, src: '/images/battri externe.jpeg', alt: 'Batterie externe', price: '30DT' },
  { id: 6, src: '/images/casq.jpeg', alt: 'Casque', price: '40DT' },
];

const CataloguePage = () => {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
      return updatedCart;
    });
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Votre panier est vide');
      return;
    }

    // Exemple d'objet de commande
    const orderData = {
      items: cart,
      total: cart.reduce((total, product) => total + parseFloat(product.price.replace('DT', '')), 0),
      userId: 'user123', // À remplacer par l'ID de l'utilisateur connecté
    };

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert('Commande passée avec succès!');
        // Réinitialiser le panier local après la commande
        localStorage.removeItem('cart');
        setCart([]);
      } else {
        alert('Erreur lors de la commande. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur lors de la commande:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Catalogue des produits</h1>
        <button onClick={() => setIsAdmin(!isAdmin)} style={{ display: 'block', margin: '10px auto', padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          {isAdmin ? 'Désactiver Mode Admin' : 'Activer Mode Admin'}
        </button>
        {isAdmin && (
          <button onClick={() => addProduct()} style={{ display: 'block', margin: '10px auto', padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Ajouter un Produit
          </button>
        )}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
        <div>
          <h2>Panier</h2>
          <ul>
            {cart.map((product, index) => (
              <li key={index}>{product.alt} - {product.price}</li>
            ))}
          </ul>
          <button onClick={handleCheckout} style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Passer la commande
          </button>
        </div>
      </div>
    </>
  );
};

export default CataloguePage;
