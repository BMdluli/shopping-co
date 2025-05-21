import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import MobileNav from "./MobileNav";
import { navItems } from "../models/navigation";
import { useCart } from "../context/CartContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUserName] = useState<string | null>(null);
  const { quantity: cartQuantity } = useCart();

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) return;
    try {
      const data: any = jwtDecode(jwtToken);
      if (data?.username) {
        setUserName(data.username);
      }
    } catch (err) {
      console.error("Error decoding token:", err);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserName(null);
  };

  return (
    <>
      <header className="flex justify-between items-center h-[70px] px-2">
        <div className="flex gap-2">
          <button className="md:hidden" onClick={() => setIsOpen(true)}>
            <img src="/icon-menu.png" alt="menu" />
          </button>
          <Link to="/">
            <img src="/logo.svg" alt="logo" />
          </Link>
        </div>

        <nav className="hidden md:block">
          <ul className="flex gap-4 items-center text-gray-500">
            {navItems.map((item) => (
              <li key={item.id}>
                <a className="hover:font-bold transition-all" href={item.url}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 md:gap-4 relative">
          <div className="hidden md:flex items-center">
            {username ? (
              <>
                <p>Hi {username}</p>
                <hr className="w-5 rotate-90" />
                <button className="cursor-pointer" onClick={handleLogout}>
                  Logout
                </button>
                <hr className="w-5 rotate-90" />
                <Link to="/orders">Orders</Link>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <hr className="w-5 rotate-90" />
                <Link to="/register">Register</Link>
              </>
            )}
          </div>

          <Link to="/cart" className="relative">
            <img src="/icon-cart.png" alt="cart" />
            {cartQuantity > 0 && (
              <span className="absolute -top-2.5 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cartQuantity}
              </span>
            )}
          </Link>

          <button onClick={() => setMenuOpen((prev) => !prev)}>
            <img src="/icon-account.png" alt="account" />
          </button>

          <div
            className={`${
              !menuOpen && "hidden"
            } absolute h-[100px] w-[150px] right-0 top-6 rounded-xl p-2 shadow-2xl z-50 bg-white px-4`}
          >
            <Link to="/account">My Account</Link>
          </div>
        </div>
      </header>

      <MobileNav isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Header;
