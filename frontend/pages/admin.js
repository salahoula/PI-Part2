import React from 'react';

const AdminPage = () => {
  const handleLogin = () => {
    localStorage.setItem('role', 'admin');
    alert('Vous êtes maintenant administrateur !');
    window.location.href = "/catalog";
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '10px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>administrateur</div>
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            gap: '15px',
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <a
              href="/"
              style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}
            >
              Accueil
            </a>
          </li>
          <li>
            <a
              href="/orders"
              style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}
            >
            </a>
          </li>
        </ul>
      </nav>
      
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Se connecter en tant qu'Admin</h1>
      <button onClick={handleLogin} style={{ backgroundColor: 'blue', color: 'white', padding: '10px', borderRadius: '5px' }}>
        Devenir Admin
      </button>
    </div>
    </div>
  );
};

export default AdminPage;
