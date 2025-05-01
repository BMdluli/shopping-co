import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Product } from "../types/product";
import { fetchProducts } from "../services/product";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);
  return (
    <div className="mx-4 max-w-[1240px] md:mx-auto">
      <Header />

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>

        <select className="bg-gray-100 p-2 rounded-full">
          <option>Sort</option>
          <option>Best sellers</option>
          <option>Newest</option>
          <option>Lowest price</option>
          <option>Highest price</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : products ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Products;
