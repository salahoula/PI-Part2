import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/navbar';
import { getProductById } from '../../utils/api';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      getProductById(id).then(data => setProduct(data));
    }
  }, [id]);

  if (!product) return <div>Chargement...</div>;

  return (
    <>
      <Header />
      <main>
        <h1>{product.name}</h1>
        <img src={product.image} alt={product.name} />
        <p>{product.description}</p>
        <p>Prix: {product.price} €</p>
        <button>Ajouter au panier</button>
      </main>
    </>
  );
};

export default ProductDetail;
