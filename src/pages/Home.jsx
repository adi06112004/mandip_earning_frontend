import { useEffect, useState } from "react";
import CampaignCard from "../components/CampaignCard";
import axios from "axios";
import BlogHome from "./BlogHome";

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 3;

  useEffect(() => {
    axios
      .get("https://mandip-backend.onrender.com/api/campaigns")
      .then((res) => setCampaigns(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const indexOfLast = currentPage * campaignsPerPage;
  const indexOfFirst = indexOfLast - campaignsPerPage;
  const currentCampaigns = campaigns.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(campaigns.length / campaignsPerPage);

  return (
    <div className="h-full w-full">
      <div className="min-h-screen bg-[#121212] px-4 sm:px-8 py-8 rounded-xl text-white">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 inline-block text-transparent bg-clip-text">
            <span className="text-amber-50">🚀</span> Live Campaigns for You
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Submit and earn — join tasks you love.
          </p>
        </div>

        {/* Campaign Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCampaigns.map((c) => (
            <div key={c._id} className="animate-fade-in-up">
              <CampaignCard campaign={c} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? "bg-green-500" : "bg-gray-700"
                } hover:bg-green-600`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
