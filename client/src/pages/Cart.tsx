import Header from "../components/Header";
import Footer from "../components/Footer";
import CartItemCard from "../components/CartItemCard";
import { useEffect, useState } from "react";
import { fetchCart } from "../services/cart";
import { CartType } from "../types/cart";
import SummaryLabel from "../components/SummaryLabel";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState<CartType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCart = async () => {
      try {
        setIsLoading(true);
        const response = await fetchCart();
        setCart(response.cart.items);
        console.log(response.cart.items);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    getCart();
  }, []);
  return (
    <div className="mx-4 max-w-[1240px] md:mx-auto">
      <Header />
      <h1 className="text-3xl font-black uppercase">Your Cart</h1>

      <div className="flex flex-col md:flex-row mt-4 gap-4 md:gap-8 mb-[10%]">
        <div className="flex flex-col gap-4 p-4 border-1 border-gray-200 rounded-2xl md:flex-2/4">
          {isLoading ? (
            <p>Loading...</p>
          ) : cart ? (
            cart.map((item) => <CartItemCard key={item._id} item={item} />)
          ) : (
            <p>done</p>
          )}
        </div>

        <div className="flex flex-col md:flex-1/4 gap-4 p-4 border-1 border-gray-200 rounded-2xl self-start">
          <h3 className="text-xl font-bold">Order Summary</h3>

          <SummaryLabel text="Subtotal" amount={0} />
          <SummaryLabel text="Delivery Fee" amount={60} />

          <hr />

          <SummaryLabel text="Total" amount={456} textStyles="text-black" />

          <Link
            to="/checkout"
            className="flex bg-black text-white gap-2 justify-center h-[54px] rounded-full items-center"
          >
            Go to Checkout <img src="/icon-arrow-right.svg" alt="arrow right" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
