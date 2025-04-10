import { useState } from "react";
import axios from "axios";

interface SignUpProps {
  closeModal?: () => void; // ✅ Close button ke liye prop
}

export function SignUp({ closeModal }: SignUpProps) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:3000/user/signup", formData);
      setSuccess("Signup successful! You can now Sign In.");

      // ✅ Modal ko close karne ke liye delay diya hai
      setTimeout(() => {
          closeModal
      }, 100);
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className=" z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button onClick={closeModal} className="absolute top-3 right-3 text-gray-600 hover:text-red-500">
          ✖
        </button>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-700">Sign Up</h1>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Sign Up
            </button>
          </div>
          <div>
            <p>allready have account! <a href="/signin">signin</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}
