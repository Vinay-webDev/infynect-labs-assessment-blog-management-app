"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchBlogs } from "../../lib/fetchBlogs";

export default function HomePage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchBlogs({ query });
        setBlogs(data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
      setLoading(false);
    };

    load();
  }, [query]);

  return (
    <main className="p-6">
      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : blogs.length === 0 ? (
        <p className="text-gray-400 text-center">No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.post_id}
              className="bg-zinc-800 p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-white font-bold text-lg mb-2">{blog.post_title}</h2>
              <p className="text-gray-400 text-sm mb-1">Category: {blog.category}</p>
              <p className="text-gray-500 text-xs">Status: {blog.status}</p>
              <p className="text-gray-500 text-xs">
                Created: {new Date(blog.created_date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
