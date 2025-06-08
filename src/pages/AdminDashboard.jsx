import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [logo, setLogo] = useState("");
  const [link, setLink] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [campaignId, setCampaignId] = useState("");

  const fetchCampaigns = () => {
    axios.get("https://mandip-backend.onrender.com/api/campaigns").then((res) => setCampaigns(res.data));
  };

  useEffect(() => {
     const token = sessionStorage.getItem("adminToken");
    if (!token) {
    window.location.href = "/admin"; // redirect if not logged in
  }
    fetchCampaigns();
  }, []);

  const addCampaign = async () => {
  if (!title || !desc) {
    alert("Please fill Title and Description");
    return;
  }

  try {
    await axios.post(
      "https://mandip-backend.onrender.com/api/admin/campaign",
      {
        campaignId,
        title,
        description: desc,
        logo,
        link,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
        },
      }
    );

    setTitle("");
    setDesc("");
    setLogo("");
    setLink("");
    setCampaignId("");
    fetchCampaigns();
  } catch (err) {
    alert("❌ Failed to add campaign");
    console.error(err);
  }
};

const deleteCampaign = async (id) => {
  try {
    await axios.delete(
      `https://mandip-backend.onrender.com/api/admin/campaign/${id}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`,
        },
      }
    );
    fetchCampaigns();
  } catch (err) {
    alert("❌ Failed to delete campaign");
    console.error(err);
  }
};


  return (
      <div className="flex items-center justify-center">
        <div className="max-w-3xl w-full bg-black/60 backdrop-blur-md border border-gray-700 rounded-xl p-6 shadow-lg text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">🎯 Admin Dashboard</h1>
        <div className="flex justify-center mb-8">
        <Link
        to="/blog-admin"
        className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-yellow-500/50 transition duration-300"
        >
        ➕ Add New Blog
        </Link>
        </div>


        <div className="space-y-4 border border-gray-700 rounded-lg p-5 bg-black/40 mb-8 shadow-inner">
          <h2 className="text-xl font-semibold mb-3">➕ Add Campaign</h2>

          <input
            type="text"
            placeholder="Campaign ID (unique, no spaces)"
            className="w-full p-3 rounded bg-[#222] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={campaignId}
            onChange={(e) => setCampaignId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Campaign Title"
            className="w-full p-3 rounded bg-[#222] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Short Description"
            className="w-full p-3 rounded bg-[#222] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            rows={3}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <input
            type="text"
            placeholder="Logo URL (optional)"
            className="w-full p-3 rounded bg-[#222] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Website/App Link (optional)"
            className="w-full p-3 rounded bg-[#222] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />

          <button
            onClick={addCampaign}
            className="w-full py-3 cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 rounded text-white font-semibold transition"
          >
            ➕ Add Campaign
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4">📋 Current Campaigns</h2>

        {campaigns.length === 0 ? (
          <p className="text-gray-400 text-center">No campaigns found.</p>
        ) : (
          campaigns.map((c) => (
            <div
              key={c._id}
              className="border border-gray-700 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 bg-black/40 shadow-inner"
            >
              <div className="mb-3 sm:mb-0 max-w-[70%]">
                <h3 className="font-bold text-lg">{c.title}</h3>
                <p className="text-gray-400 text-sm mb-1">{c.description}</p>
                {c.link && (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline text-sm hover:text-blue-400"
                  >
                    Open Campaign Link
                  </a>
                )}
              </div>

              <div className="flex space-x-3">
                <Link
                  to={`/admin/leads/${c.campaignId}`}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white transition"
                >
                  View Leads
                </Link>
                <button
                  onClick={() => deleteCampaign(c._id)}
                  className="bg-red-600 cursor-pointer hover:bg-red-700 px-4 py-2 rounded text-white transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      </div>
  );
};

export default AdminDashboard;
