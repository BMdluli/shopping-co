import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { id: 0, title: "T-shirts", url: "t-shirts" },
  { id: 1, title: "Shorts", url: "shorts" },
  { id: 2, title: "Shirts", url: "shirts" },
  { id: 3, title: "Hoodie", url: "hoodie" },
  { id: 4, title: "Jeans", url: "jeans" },
];

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 bg-opacity-40"
        >
          <div className="bg-white w-[80%] h-full px-7 shadow-xl">
            <div className="flex justify-end pt-4">
              <button onClick={onClose}>
                <img src="/icon-close.png" alt="close menu" />
              </button>
            </div>

            <img src="/logo.svg" alt="logo" className="mt-4" />

            <nav className="mt-6">
              <ul className="flex flex-col gap-4 text-gray-700 font-semibold">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      className="hover:font-bold transition-all"
                      href={item.url}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
