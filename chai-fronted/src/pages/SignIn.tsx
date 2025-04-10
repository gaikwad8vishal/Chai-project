import { useAuth } from "../authentication";
import axios from "axios";
import { Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignInProps {
  closeModal: () => void; //Close function as a prop
}

export function SignIn() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { signIn } = useAuth(); // Get signIn function from context
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleClose = () => {
    navigate("/"); // ✅ Home page par redirect karega
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
      
     
      
      // ✅ Close modal after successful login
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
    <div 
      className="z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md" >
      <div 
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()} // ✅ Prevent modal from closing when clicking inside
      >
        {/*  Close Button */}
        <button 
          onClick={handleClose} 
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
        >
          <X size={24} />
        </button>

        <div className="text-center">
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
              <div 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
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
      </div>
    </div>
  );
}


