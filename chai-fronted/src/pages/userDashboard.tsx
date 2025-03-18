import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



interface Order {
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
  const [loading, setLoading] = useState(false);
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {

    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) return "Good Morning";
      if (hour >= 12 && hour < 17) return "Good Afternoon";
      if (hour >= 17 && hour < 21) return "Good Evening";
      return "Good Night";
    };

    setGreeting(getGreeting());


    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      try {
        // ✅ Fetch User Info
        setLoading(true);
        const userRes = await axios.get("http://localhost:3000/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        // ✅ Fetch Orders
        const ordersRes = await axios.get("http://localhost:3000/user/user-order", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Orders Response:", ordersRes.data); // 🔍 Check API Response
        setOrders(ordersRes.data);
        
      } catch (error:any) {
        // Check if error has a response before accessing `status`
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  if (loading) return <p className="text-center text-lg">Wait a sec...!</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{greeting}, {user?.username}!</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      {/* Orders Section */}
      <h2 className="text-2xl font-semibold mt-6">Your Orders</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {orders.length > 0 ? (
  orders.map((order) => (
    <div key={order.id} className="border rounded-lg p-4 shadow-lg p-4">
      <p className="text-lg font-bold">Order ID: {order.id}</p>
      <p>Total: ₹{order.totalPrice.toFixed(2)}</p>
      <p>Status: <span className="font-semibold">{order.status}</span></p>
      <p className="text-sm text-gray-500">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>

      {/* ✅ Show Ordered Products */}
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
  ))
) : (
  <p>No orders found.</p>
)}

      </div>
    </div>
  );
};

export default UserDashboard;
