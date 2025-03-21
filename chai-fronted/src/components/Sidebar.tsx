import { Link } from "react-router-dom";


export default function Sidebar() {
  

  const isActive = true;
  return (
    <div className=" w-64 z-100 shadow-md rounded-lg bg-white/10  text-white flex flex-col p-5">
      <h2 className="text-2xl font-bold mb-6">🍵 Admin Panel</h2>
      <nav className="flex flex-col space-y-4">
        <Link to="/admin/dashboard" className={` Button3 hover:scale-105 flex items-center gap-2 ${isActive ? "bg-blue-500" : "bg-gray-500"}`}>Dashboard</Link>
        <Link to="/admin/products/update" className=" hover:scale-105 Button3 p-2 rounded">update Products</Link>
        <Link to="/admin/products/all" className=" p-2  hover:scale-105 Button3 rounded">All Product</Link>
        <Link to={"/admin/products/add"} className="  hover:scale-105 p-2 Button3 rounded" > Add Product</Link>
        <Link to={"/admin/all-orders"} className="  hover:scale-105 p-2 Button3 rounded" > All-orders</Link>
        <Link to={"/admin/users"} className="  hover:scale-105 p-2 Button3 rounded" > All-Users</Link>

      </nav>
    </div>
  );
}



