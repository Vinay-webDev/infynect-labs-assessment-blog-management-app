"use client";

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchBlogs } from "../lib/fetchBlogs";
import { FaRegThumbsUp, FaCommentAlt } from "react-icons/fa";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  const getMorePosts = async () => {
    try {
      const newPosts = await fetchBlogs({ pageParam: page, q: query });
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prev => [...prev, ...newPosts]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setHasMore(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearching(true);
    try {
      const newPosts = await fetchBlogs({ pageParam: 1, q: query });
      setPosts(newPosts);
      setPage(2);
      setHasMore(newPosts.length > 0);
    } catch (err) {
      console.error("Search failed:", err);
    }
    setSearching(false);
  };

  useEffect(() => {
    getMorePosts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Feed</h1>

      {/* Search Bar */}
      {/* <form onSubmit={handleSearch} className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search posts by title or content..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-zinc-800 text-white px-4 py-2 rounded-l-md w-full max-w-md focus:outline-none focus:ring focus:ring-blue-400"
        />
        <button
          type="submit"
          disabled={searching}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-md"
        >
          {searching ? "Searching..." : "Search"}
        </button>
      </form> */}

      <InfiniteScroll
        dataLength={posts.length}
        next={getMorePosts}
        hasMore={hasMore}
        loader={<p className="text-center my-6">Loading...</p>}
        endMessage={<p className="text-center text-gray-500 my-6">No more posts</p>}
      >
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.user_name}
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


