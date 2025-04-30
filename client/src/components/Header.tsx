import { useState } from "react";
import MobileNav from "./MobileNav";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
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
          <img src="/logo.svg" alt="logo" />
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

        <div className="flex gap-2">
          <a href="#">
            <img src="/icon-cart.png" alt="cart" />
          </a>

          <a href="#">
            <img src="/icon-account.png" alt="account" />
          </a>
        </div>
      </header>

      <MobileNav isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Header;
