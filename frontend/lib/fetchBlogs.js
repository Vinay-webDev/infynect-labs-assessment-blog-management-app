import api from "./api";

export async function fetchBlogs({ pageParam = 1, limit = 6, query = "" }) {
  const res = await api.get(`/blogs?page=${pageParam}&limit=${limit}&q=${encodeURIComponent(query)}`);
  return res.data;
}







