import React from "react";
import CategoryCard from "./CategoryCard";

const CategorySection = () => {
  return (
    <div className="bg-gray-100 p-4 mt-20 rounded-4xl md:p-16">
      <h2 className="uppercase text-3xl font-bold text-center md:text-5xl mb-4">
        Browse by Dress Style
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        <CategoryCard title={"Casual"} imageUrl={"/casual.jpg"} url={"/"} />
        <CategoryCard
          title={"Formal"}
          imageUrl={"/formal.jpg"}
          extraStyles="md:col-span-2"
          url={"/"}
        />
        <CategoryCard
          title={"Party"}
          imageUrl={"/party.jpg"}
          extraStyles="md:col-span-2"
          url={"/"}
        />
        <CategoryCard title={"Gym"} imageUrl={"/gym.jpg"} url={"/"} />
      </div>
    </div>
  );
};

export default CategorySection;
