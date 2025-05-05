export interface OrderItem {
  productId: string;
  name: string;
  imageUrl: string;
  size: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}
