import { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart, FaCheck } from "react-icons/fa"; // Import icons

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

export const AllProductsU = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/all-products", {
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      console.log("Fetched Products:", response.data);

      if (response.data && Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        console.error("Invalid data format", response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🛒 Add to Cart Function
  const addToCart = async (product: Product) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to add items to cart.");
        return;
      }
      await axios.post(
        "http://localhost:3000/user/add-to-cart",
        { productId: product.id, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart.");
    }
  };

  // ✅ Place Order Function
  const placeOrder = async (product: Product) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to place an order.");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/user/place",
        {
          items: [{ name: product.name, productId: product.id, price: product.price, quantity: 1 }],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Order placed successfully!");
      console.log("Order Response:", response.data);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Products</h1>
      {loading ? (
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

              <div className="flex gap-4 mt-2">
                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(product)}
                  className="flex items-center bg-gray-300 text-gray-700 px-3 py-2 rounded hover:bg-gray-400"
                >
                  <FaShoppingCart className="mr-2" /> Add to Cart
                </button>

                {/* Place Order Button */}
                <button
                  onClick={() => placeOrder(product)}
                  className="flex items-center bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                >
                  <FaCheck className="mr-2" /> Place Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
