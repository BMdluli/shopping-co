interface CategoryCardProps {
  title: string;
  extraStyles?: string;
  imageUrl: string;
  url: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  extraStyles,
  imageUrl,
  url,
}) => {
  return (
    <div
      className={`h-[190px] bg-white bg-no-repeat bg-cover bg-center mt-4 rounded-2xl md:h-[289px] ${extraStyles}`}
      style={{
        background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${imageUrl})`,
      }}
    >
      <a href={url} className="text-white text-2xl font-bold p-4 block">
        {title}
      </a>
    </div>
  );
};

export default CategoryCard;
