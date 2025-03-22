import { useState, useEffect } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import axios from "axios";

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Blurred Blobs */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>
        <Outlet/>
      {/* Dynamic Content Rendering */}
      
    </div>
  );
}

/** ✅ Home Component */
const Home = () => <h1 className="text-3xl font-bold">Welcome to Chai-Chai 🍵</h1>;

/** ✅ Blog Component */
const Blog = () => <h1 className="text-3xl font-bold">Latest Blogs 📝</h1>;

/** ✅ Showcase Component */
const Showcase = () => <h1 className="text-3xl font-bold">Our Showcase 🎭</h1>;

/** ✅ Products Component (with API fetching) */
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

const AllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/all-products", {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data && Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        console.error("Invalid data format", response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">All Products</h1>
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-md">
              <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p>{product.description}</p>
              <p className="text-green-600 font-bold">₹{product.price}</p>
              <p>Stock: {product.stock}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
