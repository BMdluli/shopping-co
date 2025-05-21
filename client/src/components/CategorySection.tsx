import CategoryCard from "./CategoryCard";

const CategorySection = () => {
  const baseUrl = `/products?category=`;
  return (
    <div className="bg-gray-100 p-4 mt-20 rounded-4xl md:p-16">
      <h2 className="uppercase text-3xl font-bold text-center md:text-5xl mb-4">
        Browse by Dress Style
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        <CategoryCard
          title={"T-shirts"}
          imageUrl={"/casual.jpg"}
          url={`${baseUrl}t-shirts`}
        />
        <CategoryCard
          title={"Shorts"}
          imageUrl={"/formal.jpg"}
          extraStyles="md:col-span-2"
          url={`${baseUrl}shorts`}
        />
        <CategoryCard
          title={"Shirts"}
          imageUrl={"/party.jpg"}
          extraStyles="md:col-span-2"
          url={`${baseUrl}shirts`}
        />
        <CategoryCard
          title={"Hoodies"}
          imageUrl={"/gym.jpg"}
          url={`${baseUrl}hoodie`}
        />
      </div>
    </div>
  );
};

export default CategorySection;
