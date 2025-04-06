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

  // Vérifier si nous sommes sur le client avant d'utiliser localStorage
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

  const addProduct = () => {
    const newProduct = { id: Date.now(), src: '/images/default.jpeg', alt: 'Nouveau Produit', price: '0DT' };
    setProducts([...products, newProduct]);
  };

  const removeProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
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
          <button onClick={addProduct} style={{ display: 'block', margin: '10px auto', padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Ajouter un Produit
          </button>
        )}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {products.map((product) => (
            <div key={product.id} style={{ position: 'relative' }}>
              <ProductCard product={product} addToCart={addToCart} />
              {isAdmin && (
                <button onClick={() => removeProduct(product.id)} style={{ position: 'absolute', top: '5px', right: '5px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}>X</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CataloguePage;
