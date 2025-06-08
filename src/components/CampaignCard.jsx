import { Link } from "react-router-dom";

const CampaignCard = ({ campaign }) => {
  return (
    <div className="bg-[#1c1c24] text-white rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition transform duration-200 border border-gray-700">
      {/* Campaign Image */}
      {campaign.logo && (
    <div className="w-full h-40 bg-gray-800 rounded-md flex items-center justify-center p-4">
    <img
      src={campaign.logo}
      alt={campaign.title}
      className="h-24 w-24 object-contain rounded-[25%] shadow-md"
    />
    </div>
)}


      <div className="p-4">
        {/* Campaign Title */}
        <h2 className="text-xl font-semibold mb-1">{campaign.title}</h2>

        {/* Campaign Description */}
        <p className="text-sm text-gray-300 mb-3 line-clamp-3">
          {campaign.description}
        </p>

        {/* Participate Button */}
        <Link
          to={`/campaign/${campaign.campaignId}`}
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
        >
          Participate →
        </Link>
      </div>
    </div>
  );
};

export default CampaignCard;
