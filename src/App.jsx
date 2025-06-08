import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Campaign from "./pages/Campaign";
import Navbar from "./components/Navbar";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLeads from "./pages/AdminLeads";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Footer from "./components/Footer";
import BlogHome from "./pages/BlogHome";
import BlogAdmin from "./pages/BlogAdmin";
import BlogPage from "./pages/BlogPage";
import AllBlogs from "./pages/AllBlogs";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/blog-home" element={<AllBlogs />} />
          <Route path="/campaign/:id" element={<Campaign />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/leads/:id" element={<AdminLeads />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/campaigns" element={<Home />} />
          <Route path="/" element={<BlogHome />} />
          <Route path="/blog-admin" element={<BlogAdmin />} />
          <Route path="/blog/:id" element={<BlogPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
