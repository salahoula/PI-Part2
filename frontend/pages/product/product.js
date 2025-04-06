// pages/products.js
import React from 'react';

const ProductsPage = () => {
  // Exemple de produits fictifs
  const products = [
    {
      id: 1,
      name: 'Produit 1',
      price: '20€',
      image: 'https://via.placeholder.com/200',
    },
    {
      id: 2,
      name: 'Produit 2',
      price: '30€',
      image: 'https://via.placeholder.com/200',
    },
    {
      id: 3,
      name: 'Produit 3',
      price: '50€',
      image: 'https://via.placeholder.com/200',
    },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Nos Produits</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              textAlign: 'center',
              width: '200px',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }}
            />
            <h2 style={{ fontSize: '18px', margin: '10px 0' }}>{product.name}</h2>
            <p style={{ fontWeight: 'bold', color: '#333' }}>{product.price}</p>
            <button
              style={{
                background: '#0070f3',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '10px',
                cursor: 'pointer',
              }}
            >
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
