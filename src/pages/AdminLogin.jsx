import { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://mandip-backend.onrender.com/api/admin/login", { email, password });
      sessionStorage.setItem("adminToken", res.data.token);
      alert("✅ Login Successful");
      window.location.href = "/admin/dashboard";
    } catch (err) {
      alert("❌ Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen rounded-2xl flex items-center justify-center bg-[#121212] px-4">
      <form
        onSubmit={handleLogin}
        className="bg-[#1e1e1e] shadow-xl rounded-2xl p-8 w-full max-w-md text-white border border-gray-700"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          Admin Login
        </h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-400">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin@example.com"
            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm text-gray-400">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 cursor-pointer rounded bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 transition-all duration-300 font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
