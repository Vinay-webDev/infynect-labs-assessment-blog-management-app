"use client";

import { useEffect, useState } from "react";
import api from '../../lib/api.js';
import { useRouter } from "next/navigation";
import { FaUserCircle, FaEnvelope, FaUpload, FaSave } from "react-icons/fa";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setUser(res.data);
        setPreview(res.data.profile_pic || null);
      } catch (err) {
        alert("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prev) => ({ ...prev, profile_pic: reader.result }));
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/profile", user);
      alert("Profile updated!");
      router.refresh();
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 px-6 py-8 bg-zinc-900 text-white rounded-xl shadow-lg border border-zinc-800">
      <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center">
          {preview ? (
            <img
              src={preview}
              className="w-24 h-24 rounded-full mb-3 border border-zinc-700 object-cover"
              alt="Profile"
            />
          ) : (
            <div className="w-24 h-24 bg-zinc-700 rounded-full mb-3 flex items-center justify-center text-zinc-400">
              <FaUserCircle size={40} />
            </div>
          )}

          <label className="cursor-pointer text-sm text-blue-400 flex items-center gap-2">
            <FaUpload />
            Upload Image
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        {/* Name Field */}
        <div className="flex items-center bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2">
          <FaUserCircle className="text-zinc-400 mr-3" />
          <input
            type="text"
            name="name"
            value={user.name}
            placeholder="Your Name"
            onChange={handleChange}
            className="w-full bg-transparent text-white outline-none"
          />
        </div>

        {/* Email Field */}
        <div className="flex items-center bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2">
          <FaEnvelope className="text-zinc-400 mr-3" />
          <input
            type="email"
            name="email"
            value={user.email}
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full bg-transparent text-white outline-none"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md flex items-center justify-center gap-2 font-medium"
        >
          <FaSave />
          Save Changes
        </button>
      </form>
    </div>
  );
}
