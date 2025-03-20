import { useEffect, useState } from "react";
import axios from "axios";
import { User } from "lucide-react";

interface User {
  id: string;
  username: string;
  role: "USER" | "ADMIN" | "DELIVERY_PERSON";
  isBlocked: boolean;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try { 
        const token = localStorage.getItem("token");  
        const response = await axios.get("http://localhost:3000/admin/users", { 
          headers: {
            Authorization: `Bearer ${token}`, 
          },
          withCredentials: true 
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  //✅ Block/Unblock User

  const toggleBlockUser = async (userId: string) => {
    try {
      await axios.patch(`http://localhost:3000/admin/user/block-unblock/${userId}`, {}, { withCredentials: true });
      setUsers(users.map(user => user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user));
    } catch (error) {
      console.error("Error toggling user block status:", error);
    }
  };

  // ✅ Delete User
  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const id = userId;
      const token = localStorage.getItem("token"); // Get token from localStorage
    
      await axios.delete(`http://localhost:3000/admin/user/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token for authentication
        },
        withCredentials: true, // Only if backend supports credentials (cookies)
      });
    
      // Update UI: Remove user from list
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }

  };

  // ✅ Update User Role
  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      await axios.put(`/admin/update-role/${userId}`, { role: newRole }, { withCredentials: true });
      setUsers(users.map(user => user.id === user.id ? { ...user, role: user.role } : user));
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading users...</p>;

  return (
    <div className="px-24 py-8 bg-[#c4a27a]">
    <div className="p-6  rounded-xl bg-white/10  h-screen">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{user.username}</td>
              <td className="border border-gray-300 px-4 py-2">
                <select
                  value={user.role}
                  onChange={(e) => updateUserRole(user.id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="DELIVERY_PERSON">Delivery</option>
                </select>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {user.isBlocked ? "Blocked" : "Not-Blocked"}
              </td> 
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <button
                  onClick={() => toggleBlockUser(user.id)}
                  className={`px-3 py-1 text-white rounded ${user.isBlocked ? "bg-green-500" : "bg-red-500"}`}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="px-3 py-1 bg-gray-700 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default Users;
