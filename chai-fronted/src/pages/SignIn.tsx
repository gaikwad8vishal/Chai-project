import { useAuth } from "../authentication";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export function SignIn() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { signIn } = useAuth(); // Get signIn function from context
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post("http://localhost:3000/user/signin", formData);

      // ✅ Store token & role in localStorage
      localStorage.setItem("token", data.token);

      // ✅ Store user in AuthContext
      signIn({ username: formData.username, role: data.role });

      // ✅ Redirect based on role
      if (data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (data.role === "DELIVERY_PERSON") {
        navigate("/user/delivery");
      } else {
        navigate("/user/dashboard");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        setError("Invalid credentials");
      } else {
        setError("Something went wrong! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex signbody items-center justify-center h-screen">
      <div className="w-full bg-white/50 backdrop-blur-lg max-w-md p-6 rounded-xl">
        <div className="text-center">
          <Link to="/" className="text-4xl font-bold text-green-700 mb-8 flex items-center justify-center">
            🍵 Chai-Chai
          </Link>
          <h1 className="text-3xl font-bold text-green-700">Sign In</h1>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
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
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              <div onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>
        <p className="text-center text-sm mt-4">
          Don't have an account? <Link to="/signup" className="text-green-700 font-bold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
