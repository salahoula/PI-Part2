import { useState, useEffect } from 'react';
import { isAuthenticated } from '../utils/auth';
import { createOrder } from '../utils/api';
import Navbar from '../components/navbar';

const Order = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);

    if (isAuthenticated()) {
      const token = localStorage.getItem('token'); // corrigé ici
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) throw new Error('Erreur de réponse');
          return res.json();
        })
        .then(data => setUser(data))
        .catch(() => setError('Impossible de récupérer les informations utilisateur'));
    } else {
      setError('Vous devez être connecté pour passer une commande');
    }
  }, []);

  const handleSubmitOrder = () => {
    if (!user || cart.length === 0) {
      setError('Panier vide ou utilisateur non identifié');
      return;
    }

    const orderDetails = {
      userId: user.id,
      products: cart,
      totalAmount: cart.reduce((total, item) => total + item.price * item.quantity, 0),
    };

    createOrder(orderDetails)
      .then(() => {
        setSuccess('Commande passée avec succès');
        localStorage.removeItem('cart');
        setCart([]);
      })
      .catch(err => {
        setError('Une erreur est survenue lors de la création de la commande');
        console.error(err);
      });
  };

  return (
    <>
      <Navbar />
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">Confirmation de la Commande</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        {cart.length > 0 && user ? (
          <>
            <div className="order-summary mb-4">
              <h2 className="text-xl font-semibold mb-2">Résumé de la commande</h2>
              <ul className="list-disc ml-5">
                {cart.map(item => (
                  <li key={item.id}>
                    {item.name} - {item.quantity} x {item.price} €
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-bold">
                Total: {cart.reduce((total, item) => total + item.price * item.quantity, 0)} €
              </p>
            </div>
            <button
              onClick={handleSubmitOrder}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Confirmer la commande
            </button>
          </>
        ) : (
          <p>Veuillez vous connecter pour passer une commande.</p>
        )}
      </main>
    </>
  );
};

export default Order;
