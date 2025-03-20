import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {


  return (
    <div className=" w-64 z-100 shadow-md rounded-lg bg-white/10  text-white flex flex-col p-5">
      <h2 className="text-2xl font-bold mb-6">🍵 Admin Panel</h2>
      <nav className="flex flex-col space-y-4">
        <Link to="/admin/dashboard" className="Button3 rounded">Dashboard</Link>
        <Link to="/admin/products/update" className="hover:bg-green-700 Button3 p-2 rounded">update Products</Link>
        <Link to="/admin/products/all" className="hover:bg-green-700 p-2 Button3 rounded">All Product</Link>
        <Link to={"/admin/products/add"} className="hover:bg-green-700 p-2 Button3 rounded" > Add Product</Link>
      </nav>
    </div>
  );
}





export const AddProduct = () => {
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
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

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
        await axios.delete(`http://localhost:3000/admin/delete-product/${productId}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        // Remove deleted product from state without reloading
        setProducts(products.filter((product) => product.id !== productId));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    };


  const updateProduct = (productId: string) => {
    const productToEdit = products.find((product) => product.id === productId);
      if (productToEdit) {
        setEditingProduct(productToEdit);
      }
    };

  return (
    <div className="p-6 adminbody h-screen ">
      <div className="mt-8 ml-4">
      <Link to="/" className="text-4xl font-bold text-gray-700  ">
            ☕️ Chai-Chai
      </Link>
      </div>
      <div className="flex mt-16 ml-4 gap-12 ">
        <Sidebar/>
        <div>
        <h1 className="text-3xl font-bold mb-4">All Products...</h1>

        <div className="  ">
        {editingProduct ? ( 
          <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg z-50">
                <UpdateProduct
                  product={editingProduct}
                  onUpdate={() => {
                    fetchProducts();
                    setEditingProduct(null);
                  }}
                  onCancel={() => setEditingProduct(null)}
                />
              </div>
            </div>
            ) : (
              <div className="w-full bg-white">
              <div className="grid grid-cols-3 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="border p-4 w-92 rounded-lg shadow-md">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-40 object-cover mb-2 rounded"
                    />
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                    <p>{product.description}</p>
                    <p className="text-green-600 font-bold">₹{product.price}</p>
                    <p>Stock: {product.stock}</p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => updateProduct(product.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                    >
                      Update
                    </button>
                  </div>
                  </div>
                ))}
        </div></div>
      )}</div></div></div>
    </div>
  );
};






// 🏷️ Define Product Type
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

// 🏷️ Define Props Type
interface UpdateProductProps {
  product: Product;
  onUpdate: () => void;
  onCancel: () => void;
}

const UpdateProduct: React.FC<UpdateProductProps> = ({ product, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState<Product>({
    ...product,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.put(
        `http://localhost:3000/admin/update-product/${product.id}`,
        formData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setMessage("Product updated successfully!");
      setLoading(false);
      onUpdate(); // Refresh product list
    } catch (error) {
      console.error("Error updating product:", error);
      setMessage("Failed to update product!");
      setLoading(false);
    }
  };

  return (

    <div className="w-96 mx-auto mt-10 p-6  shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-black">Update Product</h2>
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

        <div className="flex gap-2">
          
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-600 text-whte px-4 py-2 rounded-md hover:bg-gray-700 transition w-full"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition w-full"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>

  );
};
