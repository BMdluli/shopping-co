import React from "react";

const ProductCard = () => {
  return (
    <div className="w-[200px] md:w-[298px] shrink-0">
      <img src="/placeholder.png" alt="placeholder" />
      <p className="font-bold mt-2">T-SHIRT WITH TAPE DETAILS</p>
      <div className="bg-yellow-400 h-4 my-2"></div>
      <p className="text-xl font-bold">R2160</p>
    </div>
  );
};

export default ProductCard;
