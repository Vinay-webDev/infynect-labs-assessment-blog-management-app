"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/home?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <nav className="bg-zinc-900 text-white px-6 py-4 flex items-center justify-between shadow w-full z-50">
      {/* Left - Logo */}
      <Link href="/" className="text-xl font-bold tracking-tight">
        Blog App
      </Link>

      {/* Center - Search Bar */}
      <form onSubmit={handleSearch} className="flex-1 px-6 max-w-lg">
        <input
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-zinc-800 text-sm px-4 py-2 rounded-full outline-none placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition"
        />
      </form>

      {/* Right - Nav Links */}
      <div className="flex gap-6 items-center text-sm">
        <Link
          href="/"
          className={`hover:text-blue-400 transition ${
            pathname === "/" ? "text-blue-400" : ""
          }`}
        >
          Home
        </Link>

        <Link
          href="/login"
          className={`hover:text-blue-400 transition ${
            pathname === "/login" ? "text-blue-400" : ""
          }`}
        >
          Login
        </Link>

        <Link
          href="/register"
          className={`hover:text-blue-400 transition ${
            pathname === "/register" ? "text-blue-400" : ""
          }`}
        >
          Signup
        </Link>

        <Link
          href="/profile"
          className={`hover:text-blue-400 text-xl transition ${
            pathname === "/profile" ? "text-blue-400" : ""
          }`}
        >
          <FaUserCircle />
        </Link>
      </div>
    </nav>
  );
}
