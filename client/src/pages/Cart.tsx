import Header from "../components/Header";
import Footer from "../components/Footer";
import CartItemCard from "../components/CartItemCard";
import { useEffect, useState } from "react";
import { fetchCart } from "../services/cart";
import { CartType } from "../types/cart";
import SummaryLabel from "../components/SummaryLabel";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { deleteTokenIfExists, getUserIdFromToken } from "../services/jwt";
import toast from "react-hot-toast";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stripeLoading, setStripeLoading] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(60);
  const [total, setTotal] = useState(0);

  const handleCheckout = async () => {
    setStripeLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return;
    const userId = getUserIdFromToken();

    const stripe = await stripePromise;
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}api/create-checkout-session`,
        {
          cart: cartItems,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!data.sessionId) {
        console.error("No sessionId returned:", data);
        return;
      }

      const result = await stripe?.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (result?.error) {
        console.error("Stripe error:", result.error.message);
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Checkout error");
    } finally {
      setStripeLoading(false);
    }
  };

  useEffect(() => {
    const getCart = async () => {
      try {
        setIsLoading(true);
        const response = await fetchCart();
        const items = response?.cart?.items || [];

        setCartItems(items);

        const calculatedSubtotal = items.reduce(
          (acc: number, item: CartType) => acc + item.price * item.quantity,
          0
        );

        setSubtotal(calculatedSubtotal);
        setTotal(calculatedSubtotal + deliveryFee);
      } catch (e: any) {
        toast.error(e?.response?.data?.message || "Error fetching cart");
        deleteTokenIfExists();
      } finally {
        setIsLoading(false);
      }
    };

    getCart();
  }, []);

  return (
    <div className="mx-4 max-w-[1240px] md:mx-auto">
      <Header />
      <h1 className="text-3xl font-black uppercase mt-4">Your Cart</h1>

      <div className="flex flex-col md:flex-row mt-4 gap-4 md:gap-8 mb-[10%]">
        {/* Cart Items */}
        <div className="flex flex-col gap-4 p-4 border border-gray-200 rounded-2xl md:flex-2/4 min-h-[200px]">
          {isLoading ? (
            <p className="text-center text-gray-500">Loading your cart...</p>
          ) : cartItems.length === 0 ? (
            <p className="text-center text-gray-500">
              Your cart is currently empty.
            </p>
          ) : (
            cartItems.map((item) => <CartItemCard key={item._id} item={item} />)
          )}
        </div>

        {/* Summary Section */}
        <div className="flex flex-col md:flex-1/4 gap-4 p-4 border border-gray-200 rounded-2xl self-start w-full">
          <h3 className="text-xl font-bold">Order Summary</h3>

          <SummaryLabel text="Subtotal" amount={subtotal} />
          <SummaryLabel text="Delivery Fee" amount={deliveryFee} />

          <hr />

          <SummaryLabel
            text="Total"
            amount={total}
            textStyles="text-black font-semibold"
          />

          <button
            onClick={handleCheckout}
            disabled={cartItems.length === 0 || stripeLoading}
            className={`flex bg-black text-white gap-2 justify-center h-[54px] rounded-full items-center main-button ${
              cartItems.length === 0 || stripeLoading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {stripeLoading ? (
              "Loading..."
            ) : (
              <>
                {" "}
                Go to Checkout
                <img src="/icon-arrow-right.svg" alt="arrow right" />
              </>
            )}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
