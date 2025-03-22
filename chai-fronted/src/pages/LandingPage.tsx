import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


export default function LandingPage() {


  return (
    <div className="">
      {/* Blurred Blobs */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>
      <AllProductsLocal/>
    </div>
  );
}




interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

export const AllProductsLocal = () => {

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


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Products</h1>
      {/* shoul change accourding to  whenever user click on home then belows deta should  render  here and after click on blog the all blogs should render here*/}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};





