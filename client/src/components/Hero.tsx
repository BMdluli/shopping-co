import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:h-[663px]">
        <div className="flex flex-col gap-4 flex-1 md:justify-center md:gap-10">
          <h1 className="text-4xl font-black uppercase md:text-6xl">
            find clothes <br className="hidden md:block" /> that matches{" "}
            <br className="hidden md:block" /> your style
          </h1>
          <p className="text-xs text-gray-500 font-light md:text-base">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>

          <Link
            to="/products"
            className="flex items-center justify-center h-[52px] rounded-full bg-black text-white w-full md:max-w-[210px] main-button"
          >
            Shop Now
          </Link>
        </div>

        <div className="flex-1">
          <img
            className="object-cover h-full w-full"
            src="/hero.jpg"
            alt="hero"
          />
        </div>
      </div>
      <div className="h-20 bg-black"></div>
    </div>
  );
};

export default Hero;
