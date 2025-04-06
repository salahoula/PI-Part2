import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'; 

const ProductCard = ({ product, addToCart }) => {
  const router = useRouter(); 

  const handleAddToCart = () => {
    addToCart(product); 
    router.push('/catalogpanier'); 
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
      <Image
        src={product.src}
        alt={product.alt}
        width={200}
        height={200}
        style={{ borderRadius: '5px' }}
      />
      <p style={{ fontWeight: 'bold', margin: '10px 0' }}>{product.price}</p>
      <button
        onClick={handleAddToCart}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Ajouter au panier
      </button>
    </div>
  );

  
};

export default ProductCard;
