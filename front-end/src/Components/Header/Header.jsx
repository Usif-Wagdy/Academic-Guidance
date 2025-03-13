import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Button,
  OverlayTrigger,
  Tooltip,
  Dropdown,
} from "react-bootstrap";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import logo from "../../Assets/Logo.png";
import Cookies from "js-cookie";
import { useAuth } from "../../Context/AuthProvider";

export default function Header() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/blogs")) {
      setActiveLink("/blogs");
    } else if (location.pathname.startsWith("/tracks")) {
      setActiveLink("/tracks");
    } else if (location.pathname.startsWith("/courses")) {
      setActiveLink("/courses");
    } else if (location.pathname.startsWith("/internshipss")) {
      setActiveLink("/internshipss");
    } else if (location.pathname.startsWith("/cvbuilder")) {
      setActiveLink("/cvbuilder");
    } else if (location.pathname.startsWith("/about")) {
      setActiveLink("/about");
    } else {
      setActiveLink(location.pathname);
    }
  }, [location.pathname, auth]);

  // Function to handle logout
  const handleLogout = () => {
    Cookies.remove("authToken");
    Cookies.remove("userData");
    setAuth(null);
    navigate("/auth/login");
    setExpanded(false);
  };

  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      fixed="top"
      className="shadow-sm"
      expanded={expanded}
    >
      <Container>
        {/* Logo (Left) */}
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" width="40" height="40" />
        </Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle
          aria-controls="navbar-nav"
          className="border-0 shadow-none"
          onClick={() => setExpanded(expanded ? false : true)}
        >
          <FaBars />
        </Navbar.Toggle>

        {/* Collapsible Navbar Content */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto text-center text-lg-start gap-lg-4 p-3">
            {[
              { path: "/", label: "Home" },
              { path: "/tracks", label: "Tracks" },
              { path: "/courses", label: "Courses" },
              { path: "/internships", label: "Internships" },
              { path: "/blogs", label: "Blog" },
              { path: "/cvbuilder", label: "CV Builder" },
              { path: "/about", label: "About Us" },
            ].map(({ path, label }) => (
              <Nav.Link
                key={path}
                as={Link}
                to={path}
                onClick={() => setExpanded(false)}
                className={`py-2 py-lg-0 ${
                  activeLink === path ? "fw-bold text-primary" : ""
                }`}
              >
                {label}
              </Nav.Link>
            ))}
          </Nav>

          {/* Login & Signup (Inside the Collapsible Menu) */}
          {auth ? (
            <Nav className="d-lg-none flex-row gap-4 center-flex">
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  className="d-flex align-items-center  border-0"
                >
                  <img
                    src={
                      auth?.user.profilePicture ||
                      "https://www.viverefermo.it/images/user.png"
                    }
                    alt="Profile"
                    className="rounded-circle"
                    width="40"
                    height="40"
                  />
                  <div className="ms-2 text-start me-2">
                    <div className="fw-bold fs-14px">
                      {auth?.user.name.toString().toUpperCase() || "Admin"}
                    </div>
                    <small className="text-primary">
                      {auth?.user.isAdmin ? "Administrator" : "Student"}
                    </small>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu align="end" className="p-2">
                  <Dropdown.Item className="p-1">Profile</Dropdown.Item>
                  <Dropdown.Item className="p-1">Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    className="p-1 logout-btn"
                    onClick={handleLogout}
                  >
                    Logout{" "}
                    <FaSignOutAlt size={18} className="ms-2 logout-icon" />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          ) : (
            <Nav className="d-lg-none flex-column text-center">
              <Button
                variant={
                  activeLink === "/auth/login" ? "primary" : "outline-primary"
                }
                as={Link}
                to="/auth/login"
                onClick={() => setExpanded(false)}
                className="mb-2 py-1"
              >
                Login
              </Button>
              <Button
                variant={
                  activeLink === "/auth/register"
                    ? "primary"
                    : "outline-primary"
                }
                as={Link}
                to="/auth/register"
                onClick={() => setExpanded(false)}
                className="py-1"
              >
                Register
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>

        {/* Desktop View - Login & Signup (Outside the Collapse) */}
        {auth ? (
          <Nav className="ms-auto d-none gap-3 d-lg-flex align-items-center">
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                className="d-flex align-items-center border-0"
              >
                <img
                  src={
                    auth?.user.profilePicture ||
                    "https://www.viverefermo.it/images/user.png"
                  }
                  alt="Profile"
                  className="rounded-circle"
                  width="40"
                  height="40"
                />
                <div className="ms-2 text-start me-2">
                  <div className="fw-bold fs-14px">
                    {auth?.user.name.toString().toUpperCase() || "Admin"}
                  </div>
                  <small className="text-primary">
                    {auth?.user.isAdmin ? "Administrator" : "Student"}
                  </small>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end" className="p-2">
                <Dropdown.Item className="p-1">Profile</Dropdown.Item>
                <Dropdown.Item className="p-1">Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  className="p-1 logout-btn"
                  onClick={handleLogout}
                >
                  Logout <FaSignOutAlt size={18} className="ms-2 logout-icon" />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        ) : (
          <Nav className="ms-auto d-none d-lg-flex">
            <Button
              variant={
                activeLink === "/auth/register" ? "primary" : "outline-primary"
              }
              as={Link}
              to="/auth/register"
              className="me-2 py-1 px-2"
            >
              Register
            </Button>
            <Button
              variant={
                activeLink === "/auth/login" ? "primary" : "outline-primary"
              }
              as={Link}
              to="/auth/login"
              className="py-1 px-3"
            >
              Login
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}
