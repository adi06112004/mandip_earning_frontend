import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <div className="border border-gray-700 h-full bg-[#1a1a1a] p-4 rounded-lg hover:shadow-lg transition">
      <img src={blog.thumbnail} alt="thumb" className="w-full h-[45%] object-cover rounded mb-3" />
      <h3 className="text-xl font-semibold text-white">{blog.title}</h3>
      <p className="text-gray-400 mb-2">{blog.description.slice(0, 50)}...</p>
      <Link to={`/blog/${blog._id}`} className="text-green-400 mb-2 hover:underline">
        Read More →
      </Link>
    </div>
  );
};

export default BlogCard;
