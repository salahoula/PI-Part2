import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Décode le payload du JWT pour vérifier le rôle de l'utilisateur
      const user = JSON.parse(atob(token.split('.')[1])); // Utilise `atob` pour décoder la partie payload
      setIsAdmin(user.role === 'admin'); // Si le rôle est admin, on met à jour l'état
    }
  }, []);

  return (
    <nav className="bg-gray-100 border-b border-gray-300 py-4">
      <ul className="flex justify-between items-center px-8">
        {/* Liens de gauche */}
        <div className="flex space-x-8">
          <li>
            <a href="/index" className="text-lg text-gray-800 hover:text-blue-600 transition duration-300">
              Accueil
            </a>
          </li>
          <li>
            <a href="/catalog" className="text-lg text-gray-800 hover:text-blue-600 transition duration-300">
              Catalogue
            </a>
          </li>
          <li>
            <a href="/catalogpanier" className="text-lg text-gray-800 hover:text-blue-600 transition duration-300">
              Panier
            </a>
          </li>
          <li>
            <a href="/orderId" className="text-lg text-gray-800 hover:text-blue-600 transition duration-300">
              Paiement
            </a>
          </li>
        </div>

        {/* Liens de droite */}
        <div className="flex space-x-6">
          <li>
            <a href="/login" className="text-lg text-gray-800 hover:text-blue-600 transition duration-300">
              Login
            </a>
          </li>
          {isAdmin && (
            <li>
              <a href="/admin" className="text-lg text-gray-800 hover:text-blue-600 transition duration-300">
                Dashboard Admin
              </a>
            </li>
             )}
          <nav style={{ backgroundColor: '#333', padding: '10px', color: 'white' }}>
          <a href="/admin" style={{ color: 'white' }}>Admin</a>
          </nav>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
