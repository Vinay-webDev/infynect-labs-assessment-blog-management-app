"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api.js";
import { FaUserPlus } from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    user_name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/register", form);
      router.push("/login");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-[#1a1a1a] p-8 rounded-xl border border-gray-700 shadow-xl">
        <div className="text-center mb-6">
          <FaUserPlus className="text-3xl text-green-500 mx-auto mb-2" />
          <h1 className="text-2xl font-bold">Create New Account</h1>
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
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500"
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
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-black py-3 rounded-lg font-medium transition"
          >
            <FaUserPlus className="text-lg" />
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
