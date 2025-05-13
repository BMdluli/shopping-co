import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Product } from "../types/product";
import { fetchProducts } from "../services/product";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);

        const queryParams: any = {
          page,
          limit: 6,
        };

        if (sortOption) queryParams.sort = sortOption;
        if (category) queryParams.category = category;

        const response = await fetchProducts(queryParams);
        setProducts(response.data);
        setTotalPages(response.totalPages);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, [sortOption, page, category]); // 👈 react to category changes in the URL

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortOption(value);
    setPage(1); // Reset to first page on sort change
  };

  return (
    <div className="mx-4 max-w-[1240px] md:mx-auto">
      <Header />

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>

        <select
          className="bg-gray-100 p-2 rounded-full"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="">Sort</option>
          <option value="-sold">Best sellers</option>
          <option value="-createdAt">Newest</option>
          <option value="price">Lowest price</option>
          <option value="-price">Highest price</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 space-x-2">
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
