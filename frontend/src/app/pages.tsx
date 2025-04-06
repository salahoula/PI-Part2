import { useEffect, useState } from "react";
import { getProducts } from "../../utils/api";
import Navbar from "../../components/navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen">
        <div className="hero bg-blue-500 text-white py-20 text-center">
          <h1 className="text-5xl font-bold">
            Bienvenue sur notre boutique d'accessoires
          </h1>
          <p className="mt-4 text-lg">
            Découvrez les meilleurs accessoires téléphoniques à des prix
            incroyables !
          </p>
        </div>
      </main>
    </>
  );
};
export default Home;
