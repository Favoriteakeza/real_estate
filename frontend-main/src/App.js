import "./App.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import About from "./components/about/About";
import Contact from "./components/contacts/Contact";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import AdminDashboard from "./components/admin/AdminDashboard";
import UnAuthorized from "./components/unauthorized/UnAuthorized";
import Logout from "./Logout";
import Notfound from "./components/unauthorized/Notfound";
import Navbar from "./components/navbar/Navbar";
import Project from "./components/Project/Project"
import GlobalSearch from "./components/grobalsearch/GrobalSearch";
import VerifyEmail from "./components/verifyEmail/verifyEmail";
import ResetRequest from "./components/forgetPassword/ResetRequest";
import ResetPassword from "./components/resetPassword/ResetPassword";
import AdminRoute from "./AdminRoute";

function AppContent({ siteContent, url }) {
  const location = useLocation();

  // Pages where GlobalSearch should NOT appear
  const excludedRoutes = [
    '/login',
    '/verify-email',
    '/request-reset',
    '/reset-password',
    '/signup',
    '/unauthorized',
    '/logout',
  ];

  const isExcluded = excludedRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="App">
      {/* Conditionally render GlobalSearch */}
      {!isExcluded && <GlobalSearch data={siteContent} />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Project />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login url={url} />} />
        <Route path="/verify-email" element={<VerifyEmail url={url} />} />
        <Route path="/request-reset" element={<ResetRequest url={url} />} />
        <Route path="/reset-password/:token" element={<ResetPassword url={url} />} />
        <Route path="/signup" element={<SignUp url={url} />} />
        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route path="/logout" element={<Logout url={url} />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard url={url} />} />

        {/* Fallback Route */}
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </div>
  );
}
function App() {
  const url = "http://localhost:5000/";
  const siteContent = 
  [
    {
      "id": 1,
      "name": "About Us",
      "path": "/about",
      "content": "Trusted by thousands, we provide comprehensive services. Why choose us? We work with over a thousand people across the country and Africa. We build all types of dream houses, ensuring client satisfaction with easy and fast payment options."
    },
    {
      "id": 2,
      "name": "Contact",
      "path": "/contact",
      "content": "Contact us today. We are here to serve you with dedication and professionalism."
    },
    {
      "id": 3,
      "name": "Projects",
      "path": "/projects",
      "content": "Current projects include Greenwood Estate in New York, Sunny Apartments in California, Oceanview Villas in Florida, Highland Meadows in Texas, Maplewood Estate in Ohio, Willow Creek in Oregon, Rosewood Villas in Nevada, Aspen Heights in Colorado, Cedar Ridge in Utah, and Birchwood Estates in Washington. Each project is on track with dedicated budgets and timelines."
    },
    {
      "id": 4,
      "name": "Home",
      "path": "/",
      "content": "Welcome to Real Estate Solutions, your trusted partner in real estate development and investment. Explore comprehensive property listings, customizable solutions, and professional consultation services. Get started today!"
    },
    {
      "id": 5,
      "name": "Dashboard",
      "path": "/admin",
      "content": "The admin dashboard provides an overview of business operations, including ongoing and completed projects, pending tasks, materials used, budget utilization, upcoming deadlines, and team member activity. Recent highlights include project reviews, task completions, and team updates."
    }
  ]
  

  return (
    <Router>
      <AppContent siteContent={siteContent} url={url} />
    </Router>
  );
}

export default App;