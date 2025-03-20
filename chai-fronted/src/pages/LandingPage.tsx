
import  { Navbar1 } from ".././components/Navbar";




export default function LandingPage() {

;




  return (
    <div className="body1">
      {/* Blurred Blobs */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>
      <Navbar1/>
      <AllProducts/>
      
  
    </div>
  );
}




//import { Link } from "react-router-dom";
import { useState } from "react";

 function Sidebar() {
  return (
    <div className="h-screen w-64 bg-green-900 text-white flex flex-col p-5">
      <h2 className="text-2xl font-bold mb-6">🍵 Admin Panel</h2>
      <nav className="flex flex-col space-y-4">
        <Link to="/admin" className="hover:bg-green-700 p-2 rounded">📊 Dashboard</Link>
        <Link to="/admin/users" className="hover:bg-green-700 p-2 rounded">👥 Users</Link>
        <Link to="/admin/products/all" className="hover:bg-green-700 p-2 rounded">📦 Orders</Link>
        <Link to={"/admin/products/add"} className="hover:bg-green-700 p-2 rounded" > Add Product</Link>
      </nav>
    </div>
  );
}





 const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/admin/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Admin Auth Token
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          imageUrl: formData.imageUrl,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Product added successfully!");
        setFormData({ name: "", description: "", price: "", stock: "", imageUrl: "" });
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setMessage("Error adding product");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 m-72  p-6 bg-gray-900 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4"></h2>

      {message && <p className="text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition w-full"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

import { useEffect } from "react";
import axios from "axios";
import { Line } from "recharts";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

export const AllProducts = () => {

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

        console.log("Fetched Products:", response.data); // Debugging

        if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          console.error("Invalid data format", response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

   // Function to delete a product
    const deleteProduct = async (productId: string) => {
      
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      if (!confirmDelete) return;

      try {
        await axios.delete(`http://localhost:3000/admin/product/${productId}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        // Remove deleted product from state without reloading
        setProducts(products.filter((product) => product.id !== productId));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Products</h1>
      {products.length === 0 ? ( // ✅ Agar empty hai toh message dikhao
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-md">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p>{product.description}</p>
              <p className="text-green-600 font-bold">₹{product.price}</p>
              <p>Stock: {product.stock}</p>
              <button
              onClick={() => deleteProduct(product.id)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
            >
              Delete
            </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};





