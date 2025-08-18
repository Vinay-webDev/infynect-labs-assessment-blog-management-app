"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/api";
import { FaPlus, FaRegSave } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    post_title: "",
    content: "",
    category: "Personal",
    status: "Draft",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/blogs", form);
      router.push("/dashboard");
    } catch (err) {
      alert("Error adding post");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-[#1a1a1a] text-white p-8 rounded-xl shadow-lg border border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <MdOutlinePostAdd className="text-2xl text-blue-500" />
        <h1 className="text-2xl font-bold">Create New Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm mb-1">Post Title</label>
          <input
            type="text"
            placeholder="Your blog post title"
            value={form.post_title}
            onChange={(e) => setForm({ ...form, post_title: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Content</label>
          <textarea
            placeholder="Write your content here..."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={6}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          >
            <option>Personal</option>
            <option>Tech</option>
            <option>Travel</option>
            <option>Food</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2">Status</label>
          <div className="flex items-center gap-6 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Draft"
                checked={form.status === "Draft"}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
                className="accent-blue-600"
              />
              Draft
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Published"
                checked={form.status === "Published"}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
                className="accent-green-600"
              />
              Published
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition"
        >
          <FaRegSave className="text-lg" />
          Add Post
        </button>
      </form>
    </div>
  );
}
