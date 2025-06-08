import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs/all");
      setBlogs(res.data.blogs || res.data); // Adjust if API returns differently
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] p-6 sm:p-12 rounded-xl text-white max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-400 via-teal-400 to-green-600 bg-clip-text text-transparent select-none cursor-default">
          <span className="text-white">📝</span> All Blogs
        </h1>
        <p className="mt-3 text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
          Explore insightful articles shared by the admin.
        </p>
      </div>

      {/* Blog Grid */}
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
    </div>
  );
};

export default AllBlogs;
