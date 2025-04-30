import { useEffect, useState } from "react";
import CategorySection from "../components/CategorySection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { fetchHomeSections } from "../services/product";
import { Product } from "../types/product";

const Home = () => {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [topSelling, setTopSelling] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { newArrivals, topSelling } = await fetchHomeSections();
        setNewArrivals(newArrivals);
        setTopSelling(topSelling);
      } catch (err) {
        console.error("Failed to fetch home sections", err);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="max-w-[1240px] mx-auto">
      <Header />
      <Hero />

      <div className="mt-4 md:mt-8">
        <h2 className="font-black uppercase text-3xl text-center mb-4 md:text-5xl md:mb-8">
          New Arrivals
        </h2>
        <div className="flex gap-4 md:gap-6 overflow-x-scroll whitespace-nowrap">
          {newArrivals.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
      <hr className="text-gray-300 my-8" />

      <div className="mt-4 md:mt-8">
        <h2 className="font-black uppercase text-3xl text-center mb-4 md:text-5xl md:mb-8">
          Top Selling
        </h2>
        <div className="flex gap-4 md:gap-6 overflow-x-scroll whitespace-nowrap">
          {topSelling.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      <CategorySection />

      <Footer />
    </div>
  );
};

export default Home;
