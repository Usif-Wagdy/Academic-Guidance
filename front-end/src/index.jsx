import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";

// Components
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

// Website Pages
import Home from "./Website/Home/Home";
import Auth from "./Website/Auth/Auth";

// Layouts, main with header, auth without
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
    <Router>
      <Routes>
        {/* Pages Without Header and Footer */}
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />

        {/* Pages With Header and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
