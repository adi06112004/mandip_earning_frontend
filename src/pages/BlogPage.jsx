import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog)
    return (
      <div className="p-6 text-center text-gray-400">Loading blog...</div>
    );

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6 max-w-4xl mx-auto rounded-lg shadow-lg">
      <img
        src={blog.thumbnail}
        alt="Blog Thumbnail"
        className="w-full h-full object-cover rounded-md mb-6 border border-gray-700"
      />

      <h1 className="text-4xl font-extrabold mb-4">{blog.title}</h1>

      <p className="text-gray-300 mb-8 whitespace-pre-line">{blog.description}</p>

      <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
        Apps in this Blog
      </h2>

      {/* Apps list container */}
      <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2">
        {blog.apps.map((app, i) => (
          <div
            key={i}
            className="flex items-center bg-[#1e1e1e] rounded-lg p-3 shadow-md border border-gray-700"
            style={{ minHeight: "80px" }}
          >
            {/* App logo */}
            <img
              src={app.photo}
              alt={app.name}
              className="h-12 w-12 rounded-xl object-cover flex-shrink-0"
              loading="lazy"
            />

            {/* Name and Visit link */}
            <div className="flex flex-col ml-4 flex-grow overflow-hidden">
              <h3
                className="text-base font-semibold leading-tight"
                title={app.name}
                style={{ wordBreak: "break-word" }}
              >
                {app.name}
              </h3>
              <a
                href={app.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline break-words text-sm"
                title={app.link}
                style={{ wordBreak: "break-word" }}
              >
                Visit App
              </a>
            </div>

            {/* Download button */}
            <a
              href={app.link}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 inline-block bg-green-600 hover:bg-green-500 transition text-white px-3 py-1.5 rounded font-medium whitespace-nowrap text-sm"
              title="Download App"
            >
              ⬇ Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
