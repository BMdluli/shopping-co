import { useState } from "react";
import MobileNav from "./MobileNav";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { id: 0, title: "T-shirts", url: "t-shirts" },
    { id: 1, title: "Shorts", url: "shorts" },
    { id: 2, title: "Shirts", url: "shirts" },
    { id: 3, title: "Hoodie", url: "hoodie" },
    { id: 4, title: "Jeans", url: "jeans" },
  ];

  return (
    <>
      <header className="flex justify-between items-center h-[70px] px-2">
        <div className="flex gap-2">
          <button
            className="md:hidden"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <img src="/icon-menu.png" alt="logo" />
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

        <div className="flex gap-2 relative">
          <Link to="/cart">
            <img src="/icon-cart.png" alt="cart" />
          </Link>

          <button onClick={() => setMenuOpen((prevState) => !prevState)}>
            <img src="/icon-account.png" alt="account" />
          </button>

          <div
            className={`${
              !menuOpen && "hidden"
            } absolute  h-[100px] w-[150px] right-0 top-6 rounded-xl p-2 shadow-2xl transition-all z-50 bg-white`}
          >
            <Link to="/login">Login</Link>
          </div>
        </div>
      </header>

      <MobileNav isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Header;
