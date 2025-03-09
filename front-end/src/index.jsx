import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import "./CSS/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/custom.css";
import "./CSS/root.css";

// Authentication
import PrivateRoute from "./Website/Auth/PrivateRoute";
import { AuthProvider } from "./Context/AuthProvider";

// UX
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import ErrorPage from "./Website/Error/ErrorPage";

// Components
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

// Website Pages
import Home from "./Website/Home/Home";
import Auth from "./Website/Auth/Auth";
import Login from "./Website/Auth/Login";
import Register from "./Website/Auth/Register";
import Courses from "./Website/courses/Courses";
import CourseView from "./Website/courses/CourseView";
import Tracks from "./Website/tracks/Tracks";
import Blogs from "./Website/blogs/Blogs";
import BlogView from "./Website/blogs/BlogView";
import About from "./Website/About/About";
import Internships from "./Website/internship/Internship";
import CVBuilder from "./Website/CV Builder/CVBuilder";

// Dashboard pages
import Dashboard from "./Website/Admin/Dashboard";
import Insights from "./Website/Admin/DashboardPages/Insights";
import CVTemplate from "./Website/Admin/DashboardPages/CVTemplate";
import Roadmap from "./Website/Admin/DashboardPages/Roadmap";
import Blog from "./Website/Admin/DashboardPages/Blog";
import Intern from "./Website/Admin/DashboardPages/Intern";
import Instructors from "./Website/Admin/DashboardPages/Instructors";
import Workshop from "./Website/Admin/DashboardPages/Workshop";

// Layout with header and footer
const MainLayout = () => (
  <div className="d-flex flex-column min-vh-100 main">
    <Header />
    <main className="flex-grow-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseView />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogView />} />
            <Route path="/about" element={<About />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/cvbuilder" element={<CVBuilder />} />
          </Route>

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            {/* Redirect `/dashboard` to `/dashboard/insights` */}
            <Route index element={<Navigate to="insights" replace />} />

            {/* Actual dashboard pages */}
            <Route path="insights" element={<Insights />} />
            <Route path="cv-template" element={<CVTemplate />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="blog" element={<Blog />} />
            <Route path="internship" element={<Intern />} />
            <Route path="instructors" element={<Instructors />} />
            <Route path="workshop" element={<Workshop />} />
          </Route>

          {/* Redirect unknown routes to Home */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
