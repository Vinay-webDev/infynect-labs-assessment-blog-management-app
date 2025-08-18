"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../../../lib/api.js";
import { FaSave } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";

export default function EditPost() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    post_title: "",
    content: "",
    category: "",
    status: "Draft",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/blogs/${id}`);
        setForm(res.data);
      } catch (err) {
        alert("Failed to load post");
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/blogs/${id}`, form);
      router.push("/dashboard");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-[#1a1a1a] text-white p-8 rounded-xl shadow-lg border border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <MdEditDocument className="text-2xl text-yellow-500" />
        <h1 className="text-2xl font-bold">Edit Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm mb-1">Post Title</label>
          <input
            type="text"
            placeholder="Edit your title"
            value={form.post_title}
            onChange={(e) => setForm({ ...form, post_title: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Content</label>
          <textarea
            placeholder="Edit your content..."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={6}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-yellow-500"
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
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="accent-yellow-500"
              />
              Draft
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="Published"
                checked={form.status === "Published"}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="accent-green-500"
              />
              Published
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition"
        >
          <FaSave className="text-lg" />
          Update Post
        </button>
      </form>
    </div>
  );
}
