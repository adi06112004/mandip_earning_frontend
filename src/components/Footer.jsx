import { FaYoutube, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white py-10 px-6 mt-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
        {/* Branding */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-purple-400">Mandip Earning</h2>
          <p className="text-gray-400 text-sm">
            Providing subscribers with simple earning opportunities through exciting campaigns and trusted offers.
          </p>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-3 text-red-400">Follow Us</h3>
          <div className="flex justify-center space-x-5 text-2xl">
            <a
              href="https://www.youtube.com/@Mandipearning/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.instagram.com/mandip_earning/?igshid=YmMyMTA2M2Y%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://t.me/mandipearninge"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <FaTelegramPlane />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Mandip Earning. Made with ❤️ for our subscribers.
      </div>
    </footer>
  );
};

export default Footer;
