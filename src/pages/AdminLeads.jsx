import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AdminLeads = () => {
  const { id } = useParams();
  const [leads, setLeads] = useState([]);

  useEffect(() => {
     const token = sessionStorage.getItem("adminToken");
  if (!token) {
    window.location.href = "/admin"; // redirect if not logged in
  }
    axios.get(`http://localhost:5000/api/admin/submissions/${id}`,{
       headers: {
    Authorization: `Bearer ${sessionStorage.getItem("adminToken")}`
  }
    })
      .then((res) => setLeads(res.data));
  }, [id]);

  return (
    <div className="min-h-screen bg-black/60 rounded-2xl backdrop-blur-md py-10 px-4 text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">📥 Leads for <span className="text-green-400">{id}</span></h1>

        {leads.length === 0 ? (
          <p className="text-gray-400 text-center">No leads submitted yet.</p>
        ) : (
          <div className="space-y-4">
            {leads.map((lead, i) => (
              <div key={i} className="bg-[#111] border border-gray-700 rounded p-4 shadow hover:shadow-lg transition">
                <p><span className="text-green-400 font-semibold">👤 Name:</span> {lead.name}</p>
                <p><span className="text-blue-400 font-semibold">💸 UPI:</span> {lead.upi}</p>
                <p><span className="text-yellow-400 font-semibold">📱 WhatsApp:</span> {lead.whatsapp}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLeads;
