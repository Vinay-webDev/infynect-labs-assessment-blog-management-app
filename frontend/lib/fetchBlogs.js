
// export async function fetchBlogs({ pageParam = 1, q = "" }) {
//   const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
//   url.searchParams.append("page", pageParam.toString());
//   if (q) url.searchParams.append("q", q);

//   const res = await fetch(url.toString(), {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });

//   if (!res.ok) throw new Error("Failed to fetch blogs");
//   return await res.json();
// }




import api from "./api";

export async function fetchBlogs({ pageParam = 1, limit = 5 }) {
  const res = await api.get(`/blogs?page=${pageParam}&limit=${limit}`);
  return res.data;
}
