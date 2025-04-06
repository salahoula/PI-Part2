import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';

const CatalogPanier = () => {
  const [cart, setCart] = useState([]); // Produits dans le panier
  const [loading, setLoading] = useState(false); // État de chargement
  const [orderId, setOrderId] = useState(null); // ID de commande
  const [form, setForm] = useState({ name: '', email: '', address: '', phone: '' }); // Données du formulaire
  const router = useRouter();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value }); // Mise à jour du formulaire
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert('Votre panier est vide !');
      return;
    }

    if (!form.name || !form.email || !form.address || !form.phone) {
      alert('Veuillez remplir tous les champs du formulaire.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          customer: form,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la commande');
      }

      setOrderId(data.orderId);
      alert(`Commande créée avec succès. ID : ${data.orderId}`);
      router.push(`/payment?orderId=${data.orderId}`); // Redirection vers le paiement
    } catch (error) {
      console.error('Erreur lors de la commande :', error.message);
      alert('Erreur lors de la commande. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Votre panier</h1>
        {cart.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Votre panier est vide.</p>
        ) : (
          <>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {cart.map((product, index) => (
                <div
                  key={index}
                  style={{
                    border: '1px solid #ddd',
                    padding: '10px',
                    borderRadius: '5px',
                    textAlign: 'center',
                  }}
                >
                  <img
                    src={product.src}
                    alt={product.alt}
                    width={200}
                    height={200}
                    style={{ borderRadius: '5px' }}
                  />
                  <p style={{ fontWeight: 'bold', margin: '10px 0' }}>{product.price}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '20px' }}>
              <h2>Formulaire de commande</h2>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  maxWidth: '400px',
                  margin: '0 auto',
                }}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Nom complet"
                  value={form.name}
                  onChange={handleInputChange}
                  style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleInputChange}
                  style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Adresse"
                  value={form.address}
                  onChange={handleInputChange}
                  style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Téléphone"
                  value={form.phone}
                  onChange={handleInputChange}
                  style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                />
              </div>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  {loading ? 'Commande en cours...' : 'Passer une commande'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CatalogPanier;
