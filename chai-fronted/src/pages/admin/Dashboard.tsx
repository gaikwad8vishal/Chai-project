import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { getOrderStats, getAllUsers, getAllOrders, getCustomerOrders } from "../../api/admin";
import { Card, CardContent, CardTitle } from "../../components/ui/card";
import { Users, Package, DollarSign } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import Footer from "../../components/Footer";
import { Navbar2 } from "../../components/Navbar";

// Define Types
interface Order {
  id: string;
  status: string;
}

interface Stats {
  totalOrders: number;
  totalUsers: number;
  pendingOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  popularProducts: { name: string; quantity: number }[];
  groupedData: { [key: string]: { orders: number; revenue: number } };
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    totalUsers: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    totalRevenue: 0,
    popularProducts: [],
    groupedData: {},
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [customerOrders, setCustomerOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const [orderStats, users, orders] = await Promise.all([
          getOrderStats(),
          getAllUsers(),
          getAllOrders(),
        ]);

        const sampleUserId = users[0]?.id;
        const customerOrdersData = sampleUserId ? await getCustomerOrders(sampleUserId) : { orders: [] };

        setStats({
          totalOrders: orderStats.totalOrders || 100,
          totalUsers: users.length || 0,
          pendingOrders: orderStats.pendingOrders || orderStats.pending || 0, // Fallback for 'pending'
          deliveredOrders: orderStats.deliveredOrders || orderStats.delivered || 0,
          cancelledOrders: orderStats.cancelledOrders || orderStats.cancelled || 0,
          totalRevenue: orderStats.totalRevenue || 0,
          popularProducts: orderStats.popularProducts || [],
          groupedData: orderStats.groupedData || {},
        });
        setRecentOrders(orders.slice(0, 5));
        setCustomerOrders(customerOrdersData.orders.slice(0, 5));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const orderChartData = [
    { name: "Pending", value: stats.pendingOrders },
    { name: "Delivered", value: stats.deliveredOrders },
    { name: "Cancelled", value: stats.cancelledOrders },
  ];
  const COLORS = ["#FFBB28", "#00C49F", "#FF8042"];

  const timePeriodChartData = Object.entries(stats.groupedData).map(([key, value]) => ({
    name: key,
    orders: value.orders,
  }));

  return (
    <div className="adminbody h-screen">
      <Navbar2 />
      <div className="">
        <div className="gap-4 flex">
          <div className="ml-4">
            <Sidebar />
          </div>
          <div className="border-xl">
            <main className="flex-1 p-6 mx-4 rounded-xl bg-white/20 dark:bg-gray-900">
              <h1 className="text-3xl font-bold mb-6 text-white">Admin Dashboard</h1>

              {/* Cards Section */}
              <div className="grid md:grid-cols-4 gap-6">
                {loading ? (
                  <div className="grid md:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-white/20 animate-pulse rounded-xl h-20" />
                    ))}
                  </div>
                ) : (
                  <>
                    <Card className="bg-white/20 rounded-xl dark:bg-gray-800 flex items-center p-4">
                      <Package className="text-green-500" size={40} />
                      <CardContent className="ml-4">
                        <CardTitle>Total Orders</CardTitle>
                        <p className="text-2xl font-bold">{stats.totalOrders}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/20 rounded-xl dark:bg-gray-800 flex items-center p-4">
                      <Users className="text-blue-500" size={40} />
                      <CardContent className="ml-4">
                        <CardTitle>Total Users</CardTitle>
                        <p className="text-2xl font-bold">{stats.totalUsers}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/20 rounded-xl dark:bg-gray-800 flex items-center p-4">
                      <Package className="text-orange-500" size={40} />
                      <CardContent className="ml-4">
                        <CardTitle>Pending Orders</CardTitle>
                        <p className="text-2xl font-bold">{stats.pendingOrders}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/20 rounded-xl dark:bg-gray-800 flex items-center p-4">
                      <DollarSign className="text-yellow-500" size={40} />
                      <CardContent className="ml-4">
                        <CardTitle>Total Revenue</CardTitle>
                        <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
                      </CardContent>
                    </Card>
                  </>
                )}
              </div>

              {/* Charts Section */}
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="bg-white/20 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4 text-white">Order Status</h2>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={orderChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {orderChartData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white/20 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4 text-white">Orders by Period</h2>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={timePeriodChartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="orders" fill="#82ca9d" barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Orders Section */}
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="bg-white/20 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4 text-white">Recent Orders</h2>
                  <ul>
                    {recentOrders.map((order) => (
                      <li key={order.id} className="border-b py-2 flex justify-between text-white">
                        <span>Order #{order.id}</span>
                        <span
                          className={`font-semibold ${
                            order.status === "PENDING" ? "text-orange-500" :
                            order.status === "DELIVERED" ? "text-green-500" :
                            "text-red-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white/20 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4 text-white">Sample Customer Orders</h2>
                  <ul>
                    {customerOrders.map((order) => (
                      <li key={order.id} className="border-b py-2 flex justify-between text-white">
                        <span>Order #{order.id}</span>
                        <span
                          className={`font-semibold ${
                            order.status === "PENDING" ? "text-orange-500" :
                            order.status === "DELIVERED" ? "text-green-500" :
                            "text-red-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;