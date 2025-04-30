export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  sizes: {
    size: "small" | "medium" | "large" | "x-Large";
    quantity: number;
  }[];
  createdAt: string;
  updatedAt: string;
  sold: number;
}
