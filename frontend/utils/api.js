// URL de base de l'API
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Fonctions pour consommer l'API
export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return await response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  return await response.json();
};

export const getUserInfo = async (token) => {
  const response = await fetch(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return await response.json();
};

export const createOrder = async (orderDetails) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderDetails),
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la création de la commande');
  }

  return await response.json();
};

export const getOrders = async (token) => {
  const response = await fetch(`${API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des commandes');
  }

  return await response.json();
}


export const getOrderById = async (id, token) => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération de la commande');
  }

  return await response.json();
}

export const updateOrderStatus = async (id, status, token) => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la mise à jour du statut de la commande');
  }

  return await response.json();
}

export const deleteOrder = async (id, token) => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la suppression de la commande');
  }

  return await response.json();
}

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la connexion');
  }

  return await response.json();
};

// pages/api/checkout.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { items, total, userId } = req.body;

    try {
      // Ici, vous pouvez enregistrer la commande dans une base de données, traiter le paiement, etc.
      // Par exemple :
      // const order = await Order.create({ userId, items, total });
      
      // Simuler une confirmation de commande
      res.status(200).json({ message: 'Commande réussie' });
    } catch (error) {
      console.error('Erreur lors du traitement de la commande:', error);
      res.status(500).json({ message: 'Erreur lors de la commande' });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
