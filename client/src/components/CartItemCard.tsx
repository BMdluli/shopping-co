import { useState } from "react";
import { CartType } from "../types/cart";
import { Link } from "react-router-dom";

interface CartItemCardProps {
  item: CartType;
}

const CartItemCard = ({ item }: CartItemCardProps) => {
  const [quantity, setQuntity] = useState(item.quantity);

  const changeQuantity = (value: number) => {
    if (quantity + value < 1) return;

    setQuntity(quantity + value);
  };

  return (
    <div className="flex max-h-[130px] gap-4">
      <Link to={`/products/${item.productId}`} className="max-w-[124px]">
        <img
          className="object-cover h-full"
          src={item.imageUrl}
          alt={item.name}
        />
      </Link>

      <div className="flex flex-col justify-between flex-1">
        <div className="flex justify-between">
          <h2 className="font-bold">{item.name}</h2>

          <button className="cursor-pointer">
            <img src="/icon-trash.png" alt="delete" />
          </button>
        </div>
        <p>
          Size: <span className="font-thin text-gray-500">{item.size}</span>
        </p>

        <div className="flex justify-between">
          <p className="text-xl font-bold">R{item.price}</p>

          <div className="flex bg-gray-100 gap-2 rounded-full px-4 justify-evenly">
            <button
              className="w-5 md:w-8"
              onClick={() => changeQuantity(-1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <input
              className="w-5 text-center outline-none md:w-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              value={quantity}
              name="quantity"
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val) && val >= 1) {
                  setQuntity(val);
                }
              }}
            />
            <button className="w-5 md:w-8" onClick={() => changeQuantity(+1)}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
