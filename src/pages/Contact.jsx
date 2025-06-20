import { FaEnvelope, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#101010] rounded-2xl flex items-center justify-center px-4 py-12 text-white">
      <div className="bg-[#181818] rounded-xl shadow-lg border border-[#2c2c2c] w-full max-w-md p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-white mb-6">
          Contact <span className="text-purple-500">Support</span>
        </h2>

        <div className="space-y-6">
          <div className="bg-[#202020] p-4 rounded-lg flex items-center gap-4 hover:bg-[#272727] transition">
            <FaEnvelope className="text-purple-400 text-xl" />
            <div>
              <p className="text-sm text-gray-400">Email us at</p>
              <a
                href="mailto:skrajktr222@gmail.com"
                className="text-white font-medium hover:underline"
              >
                skrajktr222@gmail.com
              </a>
            </div>
          </div>

          <div className="bg-[#202020] p-4 rounded-lg flex items-center gap-4 hover:bg-[#272727] transition">
            <FaWhatsapp className="text-green-400 text-xl" />
            <div>
              <p className="text-sm text-gray-400">WhatsApp support</p>
              <a
                href="https://wa.me/9470875796"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-medium hover:underline"
              >
                +91 94708 75796
              </a>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-8 text-center">
          Our team usually responds within 24 hours, Monday to Saturday.
        </p>
      </div>
    </div>
  );
};

export default Contact;
