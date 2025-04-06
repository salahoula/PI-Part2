import { useState, useEffect } from 'react';


const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Récupérer les données du panier depuis localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Mettre à jour localStorage
  };

  const updateQuantity = (productId, quantity) => {
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Mettre à jour localStorage
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      <navbar />
      <main>
        <h1>Mon Panier</h1>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p>Votre panier est vide</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>{item.price} €</p>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                />
                <button onClick={() => removeFromCart(item.id)}>Supprimer</button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-summary">
            <p>Total: {calculateTotal()} €</p>
            <button>Passer à la commande</button>
          </div>
        )}
      </main>
    </>
  );
};

export default Cart;
