import React from 'react';
import Navbar from '../components/navbar';
import Image from 'next/image';
import { useRouter } from 'next/router'; // Importation du hook useRouter pour la navigation
import Footer from '../components/footer';

const Home = () => {
  const router = useRouter(); // Hook pour la navigation

  const goToCatalog = () => {
    router.push('/catalog'); // Redirige vers la page du catalogue
  };

  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Bienvenue sur notre site</h1>
        <p className="text-lg text-gray-600 mb-6">Ceci est la page d'accueil.</p>
        
        <div className="w-full max-w-xl mb-8">
          <Image
            src="/images/aa.jpeg"
            alt="Description de l'image"
            width={500}
            height={300}
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>

        <button
          onClick={goToCatalog}
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Aller au Catalogue
        </button>
      </main>
      <Footer /> {/* Ajout du footer ici */}
    </>
  );
};

export default Home;
