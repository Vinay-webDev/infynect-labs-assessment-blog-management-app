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
  });
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setUser({ name: res.data.name, email: res.data.email });
        setPreview(res.data.profile_pic || null);
      } catch {
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
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    if (file) formData.append("profile_pic", file);

    try {
      await api.put("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile updated!");
      router.refresh();
    } catch {
      alert("Failed to update profile");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 px-6 py-8 bg-zinc-900 text-white rounded-xl shadow-lg border border-zinc-800">
      <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center">
          {preview ? (
            <img src={preview} className="w-24 h-24 rounded-full mb-3 object-cover" />
          ) : (
            <div className="w-24 h-24 bg-zinc-700 rounded-full flex items-center justify-center mb-3">
              <FaUserCircle size={40} />
            </div>
          )}
          <label className="cursor-pointer text-sm text-blue-400 flex items-center gap-2">
            <FaUpload />
            Upload Image
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>
        <div className="flex items-center bg-zinc-800 px-3 py-2 rounded-md">
          <FaUserCircle className="text-zinc-400 mr-3" />
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-white"
            placeholder="Your Name"
          />
        </div>
        <div className="flex items-center bg-zinc-800 px-3 py-2 rounded-md">
          <FaEnvelope className="text-zinc-400 mr-3" />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full bg-transparent outline-none text-white"
            placeholder="Email Address"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md flex justify-center gap-2"
        >
          <FaSave />
          Save Changes
        </button>
      </form>
    </div>
  );
}
