import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";

const BlogHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = async (page) => {
    try {
      const res = await axios.get(`https://mandip-backend.onrender.com/api/blogs?page=${page}`);
      setBlogs(res.data.blogs);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="min-h-screen bg-[#121212] p-6 sm:p-12 rounded-xl text-white max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-400 via-teal-400 to-green-600 bg-clip-text text-transparent select-none cursor-default">
          <span className="text-white">📝</span> Latest Blogs
        </h1>
        <p className="mt-3 text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
          Dive into articles and updates to stay informed and inspired.
        </p>
      </div>

      {/* Blogs Grid */}
      {blogs.length === 0 ? (
        <p className="text-gray-400 text-center">No blogs available.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="animate-fadeInUp rounded-lg"
              style={{ animationDuration: "400ms", animationFillMode: "forwards" }}
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
};

export default BlogHome;
