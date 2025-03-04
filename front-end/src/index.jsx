import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import "./CSS/root.css";

// Authentication
import PrivateRoute from "./Website/Auth/PrivateRoute";

// Components
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

// Website Pages
import Home from "./Website/Home/Home";
import Auth from "./Website/Auth/Auth";
import Courses from "./Website/courses/Courses";
import Tracks from "./Website/tracks/Tracks";
import Blogs from "./Website/blogs/Blogs";
import About from "./Website/About/About";
import Login from "./Website/Auth/Login";
import Register from "./Website/Auth/Register";
import ErrorPage from "./Website/Error/ErrorPage";

import Dashboard from "./Website/Admin/Dashboard";
import { AuthProvider } from "./Context/AuthProvider";
import BlogView from "./Website/blogs/BlogView";

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
        <Routes>
          {/* Pages Without Header and Footer */}
          <Route path="/auth" element={<Auth />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          {/* Pages With Header and Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogView />} />
            <Route path="/about" element={<About />} />
          </Route>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* Redirect unknown routes to Home */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
