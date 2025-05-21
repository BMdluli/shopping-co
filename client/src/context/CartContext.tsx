// context/CartContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { fetchCart } from "../services/cart";
import { deleteTokenIfExists } from "../services/jwt";

interface CartContextType {
  quantity: number;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [quantity, setQuantity] = useState(0);

  const refreshCart = async () => {
    try {
      if (!localStorage.getItem("token")) return;
      const cartData = await fetchCart();
      if (cartData?.cart) {
        setQuantity(cartData.cart.totalQuantity || 0);
      }
    } catch (error: any) {
      if (error.status === 401) deleteTokenIfExists();
      console.error("Error refreshing cart:", error);
    }
  };

  useEffect(() => {
    refreshCart(); // initial load
  }, []);

  return (
    <CartContext.Provider value={{ quantity, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
