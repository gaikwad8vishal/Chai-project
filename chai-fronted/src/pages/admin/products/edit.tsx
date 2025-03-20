// import { useState } from "react";
// import axios from "axios";



// export const UpdateProduct = ({ product , onUpdate, onCancel }) => {
//   const [formData, setFormData] = useState({
//     name: product.name,
//     description: product.description,
//     price: product.price,
//     stock: product.stock,
//     imageUrl: product.imageUrl,
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       await axios.put(
//         `http://localhost:3000/admin/update-product/${product.id}`,
//         formData,
//         {
//           withCredentials: true,
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );

//       setMessage("Product updated successfully!");
//       setLoading(false);
//       onUpdate(); // Refresh list
//     } catch (error) {
//       console.error("Error updating product:", error);
//       setMessage("Failed to update product!");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-900 shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold mb-4 text-white">Update Product</h2>

//       {message && <p className="text-red-500">{message}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Product Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Product Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="number"
//           name="stock"
//           placeholder="Stock"
//           value={formData.stock}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           name="imageUrl"
//           placeholder="Image URL"
//           value={formData.imageUrl}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />

//         <div className="flex gap-2">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full"
//             disabled={loading}
//           >
//             {loading ? "Updating..." : "Update Product"}
//           </button>
//           <button
//             type="button"
//             onClick={onCancel}
//             className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition w-full"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };