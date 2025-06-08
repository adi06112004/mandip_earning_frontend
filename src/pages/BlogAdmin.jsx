import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogAdmin = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [apps, setApps] = useState([{ name: '', link: '', photo: '' }]);
  const [blogs, setBlogs] = useState([]); // ✅ initialize as array

  // Fetch blogs on load
  useEffect(() => {
     const token = sessionStorage.getItem("adminToken");
  if (!token) {
    window.location.href = "/admin"; // redirect if not logged in
  }
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/blogs/all');
      if (Array.isArray(res.data)) {
        setBlogs(res.data);
      } else {
        console.error("Expected array but got:", res.data);
        setBlogs([]);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setBlogs([]);
    }
  };

  const handleAddApp = () => {
    setApps([...apps, { name: '', link: '', photo: '' }]);
  };

  const handleChangeApp = (index, field, value) => {
    const newApps = [...apps];
    newApps[index][field] = value;
    setApps(newApps);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post(
      'http://localhost:5000/api/blogs/add',
      {
        title,
        description: desc,
        thumbnail,
        apps,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
        },
      }
    );
    alert('✅ Blog Added');
    setTitle('');
    setDesc('');
    setThumbnail('');
    setApps([{ name: '', link: '', photo: '' }]);
    fetchBlogs(); // refresh list
  } catch (err) {
    alert('❌ Failed to add blog');
    console.error(err);
  }
};


 const handleDelete = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/blogs/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
        },
      }
    );
    alert("🗑 Blog deleted");
    fetchBlogs(); // refresh
  } catch (err) {
    alert("❌ Failed to delete blog");
    console.error(err);
  }
};


  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white p-6 max-w-4xl mx-auto rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-green-400">🛠 Add New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        <input
          placeholder="Blog Title"
          className="w-full p-3 rounded bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Blog Description"
          className="w-full p-3 h-32 rounded bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <input
          placeholder="Thumbnail URL"
          className="w-full p-3 rounded bg-[#1a1a1a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />

        <h3 className="text-lg font-semibold text-white mt-4">📱 Add Apps</h3>
        {apps.map((app, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              placeholder="App Name"
              value={app.name}
              onChange={(e) => handleChangeApp(index, 'name', e.target.value)}
              className="p-2 rounded bg-[#1a1a1a] text-white border border-gray-700"
            />
            <input
              placeholder="App Link"
              value={app.link}
              onChange={(e) => handleChangeApp(index, 'link', e.target.value)}
              className="p-2 rounded bg-[#1a1a1a] text-white border border-gray-700"
            />
            <input
              placeholder="App Photo URL"
              value={app.photo}
              onChange={(e) => handleChangeApp(index, 'photo', e.target.value)}
              className="p-2 rounded bg-[#1a1a1a] text-white border border-gray-700"
            />
          </div>
        ))}

        <div className="flex gap-4 mt-4">
          <button
            type="button"
            onClick={handleAddApp}
            className="bg-blue-600 hover:bg-blue-500 cursor-pointer text-white font-medium px-4 py-2 rounded"
          >
            + Add App
          </button>

          <button
            type="submit"
            className="bg-green-600 cursor-pointer hover:bg-green-500 text-white font-medium px-6 py-2 rounded"
          >
            ✅ Submit Blog
          </button>
        </div>
      </form>

      {/* Existing Blogs List */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-green-400 mb-4">
          📄 Your Blogs ({blogs.length})
        </h3>
        <div className="space-y-6">
          {Array.isArray(blogs) && blogs.map((blog) => (
            <div
              key={blog._id}
              className="p-4 bg-[#1b1b1b] border border-gray-700 rounded-md flex justify-between items-center"
            >
              <div>
                <h4 className="text-lg font-bold mb-1">{blog.title}</h4>
                <p className="text-sm text-gray-400 max-w-sm">
                  {blog.description}
                </p>
              </div>
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-600 hover:bg-red-500 cursor-pointer text-white px-4 py-2 rounded"
              >
                🗑 Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogAdmin;
