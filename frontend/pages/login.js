import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isSignup && password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);

    try {
      const endpoint = isSignup ? '/api/signup' : '/api/login';
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erreur.');
      }

      if (isSignup) {
        setSuccess('Compte créé avec succès ! Vous allez être redirigé.');
        setTimeout(() => router.push('/login'), 3000);
      } else {
        setSuccess('Connexion réussie ! Redirection en cours...');
        setTimeout(() => router.push('/'), 2000);
      }
    } catch (err) {
      if (!isSignup) {
        setError('Identifiants incorrects. Voulez-vous créer un compte ?');
        setIsSignup(true); // Passe en mode inscription si la connexion échoue
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            {isSignup ? 'Créer un compte' : 'Se connecter'}
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password" className="block text-lg font-semibold text-gray-700 mb-2">Mot de passe</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {isSignup && (
              <div className="form-group mb-6">
                <label htmlFor="confirmPassword" className="block text-lg font-semibold text-gray-700 mb-2">Confirmer le mot de passe</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            )}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
            >
              {loading ? (isSignup ? 'Création...' : 'Connexion...') : (isSignup ? 'Créer un compte' : 'Se connecter')}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="mt-2 py-2 px-4 text-indigo-500 font-semibold hover:text-indigo-700"
            >
              {isSignup ? 'Vous avez déjà un compte ? Se connecter' : 'Pas encore de compte ? Créer un compte'}
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Auth;
