import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export interface Order {
  id: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
}

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true); // ✅ Default to `true`
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    // ✅ Set Dynamic Greeting
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) return "Good Morning";
      if (hour >= 12 && hour < 17) return "Good Afternoon";
      if (hour >= 17 && hour < 21) return "Good Evening";
      return "Good Night";
    };
    setGreeting(getGreeting());

    // ✅ Fetch Data (User & Orders)
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      try {
        setLoading(true);
        const [userRes, ordersRes] = await Promise.all([
          axios.get("http://localhost:3000/user/profile", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3000/user/user-order", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUser(userRes.data);
        setOrders(ordersRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="" >
    <div className="   h-full p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl text-white font-bold">
          {greeting}, {user?.username}!
        </h1>
      </div>

      {/* Orders Section */}
      <h2 className="text-2xl text-white font-semibold mt-6">Your Orders...</h2>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          {/* ✅ Loading Spinner */}
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : orders.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <p className="text-lg font-bold">Order ID: {order.id}</p>
              <p>Total: ₹{order.totalPrice.toFixed(2)}</p>
              <p>Status: <span className="font-semibold">{order.status}</span></p>
              <p className="text-sm text-gray-500">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>

              {/* Ordered Products */}
              <div className="mt-3">
                <p className="font-semibold">Products:</p>
                <ul className="list-disc pl-5">
                      {order.items.map((item) => (
                        <li key={item.id} className="text-sm">
                          {item.name} (x{item.quantity}) - ₹{(item.price * item.quantity).toFixed(2)}
                        </li>
                      ))}
                    </ul>

              </div>  
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-white mt-6">You haven’t placed any orders yet. Start shopping now! 🍵</p>
      )}
    </div>
    </div>
  );
};

export default UserDashboard;

