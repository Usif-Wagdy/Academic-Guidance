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
import { NotificationProvider } from "./Context/Notification";

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
import CoursePage from "./Website/Admin/DashboardPages/Workshop/CoursePage";
import CourseList from "./Website/Admin/DashboardPages/Workshop/CourseList";
import CourseForm from "./Website/Admin/DashboardPages/Workshop/CourseForm";
import BlogsPage from "./Website/Admin/DashboardPages/Blogs/BlogsPage";
import BlogsList from "./Website/Admin/DashboardPages/Blogs/BlogsList";
import BlogsForm from "./Website/Admin/DashboardPages/Blogs/BlogsForm";
import Intern from "./Website/Admin/DashboardPages/InternShips/Intern";
import EditIntern from "./Website/Admin/DashboardPages/InternShips/EditIntern";
import AddIntern from "./Website/Admin/DashboardPages/InternShips/AddIntern";
import Instructors from "./Website/Admin/DashboardPages/Instructors/Instructors";
import EditInstructors from "./Website/Admin/DashboardPages/Instructors/EditInstructors";
import AddInstructors from "./Website/Admin/DashboardPages/Instructors/AddInstructors";
import EditTrack from "./Website/Admin/DashboardPages/Tracks/EditTrack";
import AddTrack from "./Website/Admin/DashboardPages/Tracks/AddTrack";
import AllTracks from "./Website/Admin/DashboardPages/Tracks/Tracks";

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
    <NotificationProvider>
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
              <Route index element={<Navigate to="insights" replace />} />

              <Route path="insights" element={<Insights />} />
              <Route path="cv-template" element={<CVTemplate />} />
              <Route path="roadmap" element={<Roadmap />} />

              <Route path="tracks" element={<AllTracks />} />
              <Route path="tracks/:id" element={<EditTrack />} />
              <Route path="track/add" element={<AddTrack />} />

              <Route path="blogs" element={<BlogsPage />}>
                <Route index element={<BlogsList />} />
                <Route path="add" element={<BlogsForm />} />
                <Route path=":id" element={<BlogsForm />} />
              </Route>

              <Route path="workshop" element={<CoursePage />}>
                <Route index element={<CourseList />} />
                <Route path="add" element={<CourseForm />} />
                <Route path=":id" element={<CourseForm />} />
              </Route>

              <Route path="intern-ships" element={<Intern />} />
              <Route path="intern-ships/:id" element={<EditIntern />} />
              <Route path="intern-ship/add" element={<AddIntern />} />

              <Route path="instructors" element={<Instructors />} />
              <Route path="instructors/:id" element={<EditInstructors />} />
              <Route path="instructor/add" element={<AddInstructors />} />
            </Route>

            {/* Redirect unknown routes to Home */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </NotificationProvider>
  </React.StrictMode>
);
