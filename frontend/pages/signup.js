import { useState } from 'react';
import { useRouter } from 'next/router';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Vérification de la correspondance des mots de passe
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    try {
      // Appel de la fonction signup avec email et password
      const response = await signup(email, password);

      if (response && response.email) {
        // Redirection vers la page de connexion après l'inscription
        router.push('/login');
      } else {
        setError('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
      }
    } catch (err) {
      // Gestion d'une erreur lors de l'appel à signup
      setError(err.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Formulaire d'inscription */}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmer le mot de passe" />
      <button type="submit" disabled={loading}>S'inscrire</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignupForm;
