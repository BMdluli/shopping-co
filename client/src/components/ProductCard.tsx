import { Link } from "react-router-dom";
import { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      to={`/products/${product._id}`}
      className="min-w-[162px] md:w-[298px] shrink-0 m-auto"
    >
      <img
        className="max-h-[165px] md:max-h-[298px] mx-auto"
        src={product.imageUrl}
        alt={product.name}
      />
      <p className="font-bold mt-2">{product.name}</p>
      <div className="bg-yellow-400 h-4 my-2"></div>
      <p className="text-xl font-bold">R{product.price}</p>
    </Link>
  );
};

export default ProductCard;
