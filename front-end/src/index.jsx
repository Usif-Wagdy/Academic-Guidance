import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/custom.css";
import "./CSS/root.css";
import "./CSS/index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Authentication
import PrivateRoute from "./Website/Auth/PrivateRoute";
import { AuthProvider } from "./Context/AuthProvider";

// UX
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import ErrorPage from "./Website/Error/ErrorPage";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";

// Components
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Profile from "./Website/Profile/Profile";

// Lazy-loaded Website Pages
const Home = lazy(() => import("./Website/Home/Home"));
const Auth = lazy(() => import("./Website/Auth/Auth"));
const Login = lazy(() => import("./Website/Auth/Login"));
const Register = lazy(() => import("./Website/Auth/Register"));
const Courses = lazy(() => import("./Website/courses/Courses"));
const CourseView = lazy(() => import("./Website/courses/CourseView"));
const Tracks = lazy(() => import("./Website/tracks/Tracks"));
const TrackRoadmap = lazy(() => import("./Website/tracks/Roadmap"));
const Blogs = lazy(() => import("./Website/blogs/Blogs"));
const BlogView = lazy(() => import("./Website/blogs/BlogView"));
const About = lazy(() => import("./Website/About/About"));
const Internships = lazy(() => import("./Website/internship/Internship"));
const CVBuilder = lazy(() => import("./Website/CV Builder/CVBuilder"));

// Lazy-loaded Dashboard Pages
const Dashboard = lazy(() => import("./Website/Admin/Dashboard"));
const Insights = lazy(() => import("./Website/Admin/DashboardPages/Insights"));
const CVTemplate = lazy(() =>
  import("./Website/Admin/DashboardPages/CVTemplate")
);

const CoursePage = lazy(() =>
  import("./Website/Admin/DashboardPages/Workshop/CoursePage")
);
const CourseList = lazy(() =>
  import("./Website/Admin/DashboardPages/Workshop/CourseList")
);
const CourseForm = lazy(() =>
  import("./Website/Admin/DashboardPages/Workshop/CourseForm")
);

const BlogsPage = lazy(() =>
  import("./Website/Admin/DashboardPages/Blogs/BlogsPage")
);
const BlogsList = lazy(() =>
  import("./Website/Admin/DashboardPages/Blogs/BlogsList")
);
const BlogsForm = lazy(() =>
  import("./Website/Admin/DashboardPages/Blogs/BlogsForm")
);

const UsersPage = lazy(() =>
  import("./Website/Admin/DashboardPages/Users/UsersPage")
);
const UsersTable = lazy(() =>
  import("./Website/Admin/DashboardPages/Users/UsersTable")
);
const UsersForm = lazy(() =>
  import("./Website/Admin/DashboardPages/Users/UsersForm")
);

const Intern = lazy(() =>
  import("./Website/Admin/DashboardPages/InternShips/Intern")
);
const EditIntern = lazy(() =>
  import("./Website/Admin/DashboardPages/InternShips/EditIntern")
);
const AddIntern = lazy(() =>
  import("./Website/Admin/DashboardPages/InternShips/AddIntern")
);

const EditTrack = lazy(() =>
  import("./Website/Admin/DashboardPages/Tracks/EditTrack")
);
const AddTrack = lazy(() =>
  import("./Website/Admin/DashboardPages/Tracks/AddTrack")
);
const AllTracks = lazy(() =>
  import("./Website/Admin/DashboardPages/Tracks/Tracks")
);

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
    <ToastContainer />
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Main Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />

              <Route
                path="/auth"
                element={
                  <PrivateRoute type={"requireNoAuth"}>
                    <Auth />
                  </PrivateRoute>
                }
              >
                <Route index element={<Navigate to="login" replace />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>

              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseView />} />

              <Route path="/tracks" element={<Tracks />} />
              <Route path="/tracks/:id" element={<TrackRoadmap />} />

              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<BlogView />} />

              <Route path="/about" element={<About />} />
              <Route path="/internships" element={<Internships />} />
              <Route path="/cvbuilder" element={<CVBuilder />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute type={"requireAuth"}>
                    <Profile />
                  </PrivateRoute>
                }
              />
            </Route>

            {/* Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute type={"admin"}>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route index element={<Navigate to="insights" replace />} />

              <Route path="insights" element={<Insights />} />
              <Route path="cv-template" element={<CVTemplate />} />

              <Route
                path="tracks"
                element={
                  <PrivateRoute type="trackAdmin">
                    <AllTracks />
                  </PrivateRoute>
                }
              />
              <Route path="tracks/:id" element={<EditTrack />} />
              <Route path="track/add" element={<AddTrack />} />

              <Route
                path="blogs"
                element={
                  <PrivateRoute type={"instructor"}>
                    <BlogsPage />
                  </PrivateRoute>
                }
              >
                <Route index element={<BlogsList />} />
                <Route path="add" element={<BlogsForm />} />
                <Route path=":id" element={<BlogsForm />} />
              </Route>

              <Route
                path="workshop"
                element={
                  <PrivateRoute type={"instructor"}>
                    <CoursePage />
                  </PrivateRoute>
                }
              >
                <Route index element={<CourseList />} />
                <Route path="add" element={<CourseForm />} />
                <Route path=":id" element={<CourseForm />} />
              </Route>

              <Route
                path="users"
                element={
                  <PrivateRoute type={"superAdmin"}>
                    <UsersPage />
                  </PrivateRoute>
                }
              >
                <Route index element={<UsersTable />} />
                <Route path="add" element={<UsersForm />} />
                <Route path=":id" element={<UsersForm />} />
              </Route>

              <Route path="intern-ships" element={<Intern />} />
              <Route path="intern-ships/:id" element={<EditIntern />} />
              <Route path="intern-ship/add" element={<AddIntern />} />
            </Route>

            {/* Redirect unknown routes to Home */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
