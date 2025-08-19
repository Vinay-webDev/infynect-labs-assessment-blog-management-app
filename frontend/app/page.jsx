"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchBlogs } from "../lib/fetchBlogs";
import { FaRegThumbsUp, FaCommentAlt } from "react-icons/fa";

export default function HomePage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
    loadPosts(1, true);
  }, [query]);


  const loadPosts = async (pageNum = page, reset = false) => {
    try {
      const newPosts = await fetchBlogs({ pageParam: pageNum, query });
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => (reset ? newPosts : [...prev, ...newPosts]));
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setHasMore(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Feed</h1>

      <InfiniteScroll
        dataLength={posts.length}
        next={() => loadPosts()}
        hasMore={hasMore}
        loader={<p className="text-center my-6">Loading...</p>}
        endMessage={<p className="text-center text-gray-500 my-6">No more posts</p>}
      >
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.post_id}
              className="bg-zinc-900 rounded-xl shadow hover:shadow-lg transition-all p-5 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold">{post.post_title}</h2>
                <p className="text-gray-400 text-sm mt-1 mb-3">#{post.category}</p>
                <p className="text-gray-500 text-xs mb-4">
                  {post.created_date?.split("T")[0]}
                </p>
                <p className="text-sm text-gray-300 line-clamp-3">{post.content}</p>
              </div>

              <div className="flex gap-4 pt-4 mt-auto border-t border-zinc-700 text-gray-400">
                <FaRegThumbsUp className="hover:text-white cursor-pointer" />
                <FaCommentAlt className="hover:text-white cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
