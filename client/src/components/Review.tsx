import React from "react";

const Review = () => {
  return (
    <div className="border-1 border-gray-200 p-4 flex flex-col gap-4 rounded-3xl md:p-12">
      <div className="h-4 bg-amber-300"></div>

      <p className="font-bold">Samantha D.</p>

      <p className="text-gray-600 text-sm font-thin">
        "I absolutely love this t-shirt! The design is unique and the fabric
        feels so comfortable. As a fellow designer, I appreciate the attention
        to detail. It's become my favorite go-to shirt."
      </p>

      <p className="text-gray-700">Posted on August 14, 2023</p>
    </div>
  );
};

export default Review;
