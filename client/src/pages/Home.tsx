import CategorySection from "../components/CategorySection";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

const Home = () => {
  return (
    <div className="max-w-[1240px] mx-auto">
      <Header />
      <Hero />

      <div className="mt-4 md:mt-8">
        <h2 className="font-black uppercase text-3xl text-center mb-4 md:text-5xl md:mb-8">
          New Arrivals
        </h2>
        <div className="flex gap-4 md:gap-6 overflow-x-scroll whitespace-nowrap">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
      <hr className="text-gray-300 my-8" />

      <div className="mt-4 md:mt-8">
        <h2 className="font-black uppercase text-3xl text-center mb-4 md:text-5xl md:mb-8">
          Top Selling
        </h2>
        <div className="flex gap-4 md:gap-6 overflow-x-scroll whitespace-nowrap">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>

      <CategorySection />
    </div>
  );
};

export default Home;
