"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../../../lib/api.js";

export default function ViewPost() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/blogs/${id}`);
        setPost(res.data);
      } catch (err) {
        alert("Failed to fetch post");
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h1 className="text-3xl font-bold">{post.post_title}</h1>
      <p className="text-sm text-gray-600">Category: {post.category} | Status: {post.status}</p>
      <hr className="my-4" />
      <p className="whitespace-pre-line">{post.content}</p>
      <div className="mt-6">
        <button onClick={() => router.back()} className="bg-blue-600 text-white px-4 py-2 rounded">Back</button>
      </div>
    </div>
  );
}
