const Footer = () => {
  return (
    <footer className="bg-gray-50 py-10 px-6 animate-fade-in mt-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
        <div className="flex justify-center">
          <img src="/logo.svg" alt="logo" />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-400">
            <li>
              <a href="#" className="hover:text-white transition">
                T-shirts
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Shorts
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Shirts
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Hoodie
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Jeans
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#" className="hover:text-blue-400 transition">
              <img src="/icon-facebook.svg" alt="facebook" />
            </a>
            <a href="#" className="hover:text-pink-400 transition">
              <img src="/icon-instagram.svg" alt="instagram" />
            </a>
            <a href="#" className="hover:text-blue-300 transition">
              <img src="/icon-twitter.svg" alt="twitter" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-8">
        &copy; 2025 Shopping.co. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
