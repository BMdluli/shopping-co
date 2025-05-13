import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Review from "../components/Review";
import { Product } from "../types/product";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../services/product";
import { addToCart } from "../services/cart";
import toast from "react-hot-toast";

const ProductPage = () => {
  const [quantity, setQuntity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [size, setSize] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const { id } = useParams();
  const sizes = ["small", "medium", "large", "x-Large"];

  const changeQuantity = (value: number) => {
    if (quantity + value < 1) return;
    setQuntity(quantity + value);
  };

  const handleAddToCart = async () => {
    if (!product) return;

    setIsLoading(true);
    try {
      await addToCart({ productId: id || "", quantity, size: sizes[size] });
      toast.success("Added to cart");
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      setIsLoadingProduct(true);
      try {
        const result = await fetchProduct(id || "");
        setProduct(result);
      } catch (e: any) {
        toast.error(e?.response?.data?.message || "Failed to load product");
      } finally {
        setIsLoadingProduct(false);
      }
    };

    getProduct();
  }, [id]);

  return (
    <div className="mx-4 max-w-[1240px] md:mx-auto">
      <Header />

      {isLoadingProduct ? (
        <div className="text-center py-20 text-gray-500">
          Loading product...
        </div>
      ) : !product ? (
        <div className="text-center py-20 text-red-500">Product not found.</div>
      ) : (
        <>
          <div className="flex flex-col gap-4 md:flex-row md:gap-8 max-h-[543px]">
            {/* Product content */}
            <div className="flex-1">
              <img
                className="h-full w-full object-contain"
                src={product.imageUrl}
                alt={product.name}
              />
            </div>

            <div className="flex flex-col flex-1 md:justify-between gap-4">
              <p className="uppercase text-2xl font-bold mt-4 md:text-4xl">
                {product.name}
              </p>

              <div className="h-5 bg-amber-300"></div>

              <div className="flex gap-2">
                {product.isSale ? (
                  <>
                    <p className="text-2xl font-semibold md:text-3xl">
                      R{product.salePrice}
                    </p>
                    <p className="text-2xl font-semibold text-gray-400 line-through md:text-3xl">
                      R{product.price}
                    </p>
                    <div className="bg-red-500/10 rounded-full">
                      <p className="text-sm mt-auto p-2 text-red-500">
                        -
                        {Math.round(
                          ((product.price - product.salePrice) /
                            product.price) *
                            100
                        )}
                        %
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-2xl font-semibold md:text-3xl">
                    R{product.price}
                  </p>
                )}
              </div>

              <p className="text-sm text-gray-500 md:text-base">
                {product.description}
              </p>

              <hr className="text-gray-200" />

              <div className="my-4">
                <p className="text-sm text-gray-600">Choose Size</p>
                <div className="mt-2 flex gap-4 overflow-x-auto">
                  {product.sizes.map((item, index) => (
                    <button
                      onClick={() => setSize(index)}
                      className={`font-thin text-gray-700 h-[39px] px-4 rounded-full shrink-0 md:h-[46px] cursor-pointer ${
                        index === size ? "text-white bg-black" : "bg-gray-100"
                      }`}
                      key={item.size}
                    >
                      {item.size}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="text-gray-200" />

              <div className="my-4 flex h-11 gap-4 md:h-14">
                <div className="flex bg-gray-100 gap-2 rounded-full px-4 justify-evenly">
                  <button
                    className="w-5 md:w-8 "
                    onClick={() => changeQuantity(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    className="w-5 text-center outline-none md:w-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    type="number"
                    value={quantity}
                    name="quantity"
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val) && val >= 1) {
                        setQuntity(val);
                      }
                    }}
                  />
                  <button
                    className="w-5 md:w-8"
                    onClick={() => changeQuantity(+1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-white bg-black flex-1 rounded-full main-button disabled:bg-black/70"
                  onClick={handleAddToCart}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>

          <hr className="text-gray-200 mt-4 md:mt-8" />

          <div className="mt-8">
            <div className="flex justify-between">
              <div className="flex gap-1 items-center">
                <h3 className="text-xl font-semibold md:text-3xl">
                  All Reviews
                </h3>
                <p className="text-sm text-gray-500">(451)</p>
              </div>
              <button className="text-white bg-black h-10 px-2 rounded-full md:h-12 md:px-4">
                Write Review
              </button>
            </div>

            <div className="mt-4 grid md:grid-cols-2 gap-4 md:gap-8">
              <Review />
              <Review />
              <Review />
              <Review />
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default ProductPage;
