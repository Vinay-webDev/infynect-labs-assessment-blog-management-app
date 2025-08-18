"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext.js";
import api from "../../lib/api.js";
import { FaSignInAlt } from "react-icons/fa";

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ user_name: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.token);
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-[#1a1a1a] p-8 rounded-xl border border-gray-700 shadow-xl">
        <div className="text-center mb-6">
          <FaSignInAlt className="text-3xl text-yellow-500 mx-auto mb-2" />
          <h1 className="text-2xl font-bold">Login to Your Account</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={form.user_name}
              onChange={(e) =>
                setForm({ ...form, user_name: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-lg font-medium transition"
          >
            <FaSignInAlt className="text-lg" />
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
