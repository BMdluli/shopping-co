import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Success = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center text-center p-6">
        <div className="max-w-md w-full">
          <div className="flex justify-center mb-6">
            <img src="/icon-check.png" alt="Success" className="w-20 h-20" />
          </div>

          <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been confirmed and is
            being processed.
          </p>

          <Link
            to="/"
            className="block bg-black text-white text-center py-3 rounded-full font-semibold hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Success;
