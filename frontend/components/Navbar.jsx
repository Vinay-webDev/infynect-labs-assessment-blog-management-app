"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/home?q=${encodeURIComponent(query.trim())}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="bg-zinc-900 text-white px-6 py-4 flex items-center justify-between shadow w-full z-50 relative">
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
      <div className="flex gap-6 items-center text-sm relative">
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

        {/* User Icon with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`text-xl hover:text-blue-400 transition`}
          >
            <FaUserCircle />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-zinc-800 border border-zinc-700 rounded-lg shadow-lg flex flex-col text-sm">
              <Link
                href="/dashboard"
                className="px-4 py-2 hover:bg-zinc-700 transition"
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="px-4 py-2 hover:bg-zinc-700 transition"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-zinc-700 text-left w-full transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
