"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

import {
  PlusIcon,
  EyeIcon,
  PencilSquareIcon,
  TagIcon,
  ArrowRightOnRectangleIcon,
  ArrowDownTrayIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const { logout } = useAuth();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await api.get("/blogs/my-blogs");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const exportCSV = async () => {
    try {
      const res = await api.get("/blogs/export.csv", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "blog_posts.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error exporting CSV", err);
    }
  };

  const handleDelete = async (post_id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`/blogs/${post_id}`);
      setPosts((prev) => prev.filter((p) => p.post_id !== post_id));
    } catch (err) {
      console.error("Error deleting post", err);
      alert("Failed to delete post.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-100 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Feed</h1>
        <div className="flex gap-3">
          <Link
            href="/dashboard/new"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition"
          >
            <PlusIcon className="h-5 w-5" />
            New Post
          </Link>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full text-sm font-medium transition"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
            Export CSV
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-full text-sm font-medium transition"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <p className="text-gray-400 text-center text-lg">You haven’t written any blogs yet.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.post_id}
              className="bg-gray-800 rounded-xl shadow border border-gray-700 px-6 py-5 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{post.post_title}</h2>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    post.status === "published"
                      ? "bg-green-200 text-green-900"
                      : "bg-yellow-200 text-yellow-900"
                  }`}
                >
                  {post.status}
                </span>
              </div>

              <div className="text-sm text-gray-400 mt-2 mb-3 flex items-center gap-1">
                <TagIcon className="h-4 w-4" />
                {post.category}
              </div>

              <div className="flex gap-6 mt-4 text-sm font-medium">
                <Link
                  href={`/dashboard/view/${post.post_id}`}
                  className="flex items-center gap-1 text-blue-400 hover:underline"
                >
                  <EyeIcon className="h-4 w-4" />
                  View
                </Link>
                <Link
                  href={`/dashboard/edit/${post.post_id}`}
                  className="flex items-center gap-1 text-green-400 hover:underline"
                >
                  <PencilSquareIcon className="h-4 w-4" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.post_id)}
                  className="flex items-center gap-1 text-red-400 hover:underline"
                >
                  <TrashIcon className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
