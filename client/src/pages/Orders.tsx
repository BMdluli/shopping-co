import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { fetchOrders } from "../services/order";
import { Order } from "../types/order";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      try {
        const response = await fetchOrders();
        setOrders(response.orders);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, []);
  return (
    <div className="mx-4 max-w-[1240px] md:mx-auto">
      <Header />
      {isLoading ? (
        <p>Loading....</p>
      ) : orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col gap-4 shadow-md mt-4 p-4 md:p-8"
          >
            <h3 className="text-lg font-semibold md:text-xl">#{order._id}</h3>

            <hr />

            <ul className="flex gap-4">
              {order.items.map((item) => (
                <Link
                  to={`/products/${item.productId}`}
                  className="w-[100px] h-[100px] p-4 border-1"
                  key={item.productId}
                >
                  <img src={item.imageUrl} alt={item.name} />
                </Link>
              ))}
            </ul>
            <p>Total: R{order.total}</p>
            <p>Status: {order.status}</p>
          </div>
        ))
      )}
      <Footer />
    </div>
  );
};

export default Orders;
