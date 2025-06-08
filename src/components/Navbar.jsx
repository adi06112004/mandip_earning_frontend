import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/mandiplogo.jpg";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo + Brand */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Mandip Earning Logo"
            className="h-10 w-10 object-contain rounded-full border-2 border-green-950"
          />
          <span className="text-xl font-bold tracking-wide">Mandip Earning</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 font-medium text-gray-300">
          <li><Link to="/" className="hover:text-green-400 transition">Home</Link></li>
          <li><Link to="/blog-home" className="hover:text-green-400 transition">Blogs</Link></li>
          <li><Link to="/about" className="hover:text-green-400 transition">About</Link></li>
          <li><Link to="/contact" className="hover:text-green-400 transition">Contact</Link></li>
          <li><Link to="/campaigns" className="hover:text-green-400 transition">Campaigns</Link></li>
        </ul>

        {/* Hamburger Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col justify-center items-center space-y-1 p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${open ? "rotate-45 translate-y-1.5" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${open ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
        </button>
      </div>

      {/* Right-to-Left Slide Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 transition-transform duration-300 ease-in-out z-40 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button onClick={() => setOpen(false)} aria-label="Close menu">
            <svg className="w-6 h-6 text-white hover:text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4 flex flex-col space-y-4">
          {["Home","Blogs", "Campaigns","About", "Contact"].map((item) => (
            <Link
              key={item}
              to={item==="Blogs"?"/blog-home":item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="block text-lg text-gray-300 hover:text-green-400 transition"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
