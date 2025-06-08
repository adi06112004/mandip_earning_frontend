import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Campaign = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [form, setForm] = useState({ name: "", upi: "", whatsapp: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ upi: "", whatsapp: "" });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/campaign/${id}`)
      .then((res) => setCampaign(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const validate = () => {
    const phoneRegex = /^[6-9]\d{9}$/;
    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    let valid = true;
    const newErrors = { upi: "", whatsapp: "" };

    if (!phoneRegex.test(form.whatsapp)) {
      newErrors.whatsapp = "Enter a valid 10-digit phone number";
      valid = false;
    }

    if (!upiRegex.test(form.upi)) {
      newErrors.upi = "Enter a valid UPI ID (e.g., name@bank)";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    axios
      .post("http://localhost:5000/api/submit", {
        ...form,
        campaignId: id,
        linkedCampaign: campaign._id,
      })
      .then(() => {
        setSubmitted(true);
        setTimeout(() => {
           window.open(campaign.link, "_blank");
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
        alert("Something went wrong");
      });
  };

  if (!campaign) {
    return <p className="text-center text-white p-10">Loading campaign...</p>;
  }

  if (submitted) {
    return (
      <div className="flex items-center rounded-2xl justify-center min-h-screen bg-black text-white px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-400 mb-3">🎉 Thank you!</h2>
          <p className="text-lg text-gray-300">Redirecting you to the offer...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen rounded-2xl flex items-center justify-center bg-gradient-to-br from-black to-[#1a1a1a] px-4 py-10 text-white">
      <div className="w-full max-w-xl backdrop-blur-lg bg-black/60 rounded-xl border border-gray-800 shadow-lg p-6 sm:p-8 space-y-6">
        {/* Campaign Logo */}
        {campaign.logo && (
          <div className="flex justify-center">
            <img
              src={campaign.logo}
              alt={campaign.title}
              className="w-24 h-24 rounded-full object-contain border border-gray-500 shadow-md"
            />
          </div>
        )}

        {/* Campaign Title */}
        <h1 className="text-center text-3xl sm:text-4xl font-bold text-white">
          {campaign.title}
        </h1>

        {/* Instructions */}
        <div className="bg-[#1f1f1f] border-l-4 border-yellow-500 text-sm text-gray-300 p-5 rounded-lg shadow-inner">
          <p className="text-yellow-400 font-semibold mb-2 flex items-center gap-2">
            <span className="text-lg">📢</span> Important Instructions
          </p>
          <ul className="list-disc pl-5 space-y-1 marker:text-yellow-400">
            {campaign.description.split("\n").map((line, i) => (
              <li key={i}>
                <span className="text-gray-300">{line}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-400">Your Name</label>
            <input
              type="text"
              placeholder="e.g., Rahul Sharma"
              required
              className="w-full bg-[#1f1f1f] p-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-white placeholder:text-gray-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* UPI Input */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-400">UPI ID</label>
            <input
              type="text"
              placeholder="e.g., rahul@ybl"
              required
              className={`w-full bg-[#1f1f1f] p-3 border ${
                errors.upi ? "border-red-500" : "border-gray-700"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-white placeholder:text-gray-500`}
              value={form.upi}
              onChange={(e) => setForm({ ...form, upi: e.target.value })}
            />
            {errors.upi && <p className="text-red-400 text-sm">{errors.upi}</p>}
          </div>

          {/* WhatsApp Number Input */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-400">Phone Number</label>
            <input
              type="text"
              placeholder="e.g., 9876543210"
              required
              className={`w-full bg-[#1f1f1f] p-3 border ${
                errors.whatsapp ? "border-red-500" : "border-gray-700"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-white placeholder:text-gray-500`}
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
            />
            {errors.whatsapp && (
              <p className="text-red-400 text-sm">{errors.whatsapp}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 cursor-pointer bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white font-semibold rounded hover:opacity-90 transition duration-200 shadow-lg"
          >
            🚀 Submit & Claim Offer
          </button>
        </form>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-400 pt-2">
          ⚠️ Please make sure your details are correct. Only one submission per campaign is allowed.
        </p>
      </div>
    </div>
  );
};

export default Campaign;
