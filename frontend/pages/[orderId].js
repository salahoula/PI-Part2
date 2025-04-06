import { useRouter } from 'next/router';
import { useState } from 'react';

const PaymentPage = () => {

  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardType, setCardType] = useState('');
  const [amount, setAmount] = useState('');
  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Veuillez sélectionner un mode de paiement.');
      return;
    }
    if (paymentMethod === 'card' && (!cardType || !amount)) {
      alert('Veuillez sélectionner un type de carte et entrer un montant.');
      return;
    }

    setTimeout(() => {
      setIsPaid(true);
      alert(
        `Paiement de ${amount} DT effectué avec succès ${
          paymentMethod === 'card' ? `avec ${cardType}` : 'en espèces'
        } !`
      );
    }, 1000);
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
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Paiement</div>
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

      {/* Contenu principal */}
      <div
        style={{
          padding: '20px',
        }}
      >
        <h1 style={{ textAlign: 'center', color: '#333' }}>Paiement</h1>
        
        <div
          style={{
            margin: '20px auto',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            maxWidth: '400px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2 style={{ fontSize: '20px', marginBottom: '10px', color: '#555' }}>
            Sélectionnez votre mode de paiement :
          </h2>
          <div style={{ marginBottom: '20px' }}>
           
            <label style={{ display: 'block', marginBottom: '10px' }}>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ marginRight: '10px' }}
              />
              Paiement par carte bancaire
            </label>
          </div>

          {paymentMethod === 'card' && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '10px', color: '#555' }}>
                Sélectionnez votre type de carte :
              </h3>
              <select
                value={cardType}
                onChange={(e) => setCardType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  fontSize: '16px',
                  marginBottom: '10px',
                }}
              >
                <option value="">-- Sélectionnez un type de carte --</option>
                <option value="Visa">Visa</option>
                <option value="MasterCard">MasterCard</option>
                <option value="PayPal">PayPal</option>
                <option value="Edinart">Edinart</option>
              </select>

              <h3 style={{ fontSize: '16px', marginBottom: '10px', color: '#555' }}>
                Entrez le montant à payer :
              </h3>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Montant en DT"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  fontSize: '16px',
                }}
              />
            </div>
          )}

          <button
            onClick={handlePayment}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor:
                paymentMethod && (paymentMethod !== 'card' || (cardType && amount))
                  ? '#28a745'
                  : '#6c757d',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor:
                paymentMethod && (paymentMethod !== 'card' || (cardType && amount))
                  ? 'pointer'
                  : 'not-allowed',
            }}
            disabled={!paymentMethod || (paymentMethod === 'card' && (!cardType || !amount))}
          >
            {isPaid ? 'Paiement effectué' : 'Payer maintenant'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
