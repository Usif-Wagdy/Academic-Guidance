import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Button,
  OverlayTrigger,
  Tooltip,
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

  useEffect(() => {
    if (location.pathname.startsWith("/profile")) {
      setActiveLink("/profile");
    } else {
      setActiveLink(location.pathname);
    }
  }, [location, auth]);

  // Function to handle logout
  const handleLogout = () => {
    Cookies.remove("authToken");
    Cookies.remove("userData");
    setAuth(null);
    navigate("/auth/login");
  };

  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      fixed="top"
      className="shadow-sm"
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
              { path: "/internship", label: "Internship" },
              { path: "/blogs", label: "Blog" },
              { path: "/cvbuilder", label: "CV Builder" },
              { path: "/about", label: "About Us" },
            ].map(({ path, label }) => (
              <Nav.Link
                key={path}
                as={Link}
                to={path}
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
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="logout-tooltip">Profile</Tooltip>}
              >
                <Button as={Link} to="/profile" variant="link">
                  <img
                    src={auth.user.profilePicture}
                    alt="Profile"
                    style={{ width: "40px", height: "40px" }}
                    className="rounded-circle"
                  />
                </Button>
              </OverlayTrigger>

              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="logout-tooltip">Logout</Tooltip>}
              >
                <Button
                  variant="link"
                  className="logout-btn p-0 border-0"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="logout-icon" />
                </Button>
              </OverlayTrigger>
            </Nav>
          ) : (
            <Nav className="d-lg-none flex-column text-center">
              <Button
                variant={
                  activeLink === "/auth/login" ? "primary" : "outline-primary"
                }
                as={Link}
                to="/auth/login"
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
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="logout-tooltip">Profile</Tooltip>}
            >
              <Button as={Link} to="/profile" variant="link">
                <img
                  src={auth.user.profilePicture}
                  alt="Profile"
                  style={{ width: "40px", height: "40px" }}
                  className="rounded-circle"
                />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="logout-tooltip">Logout</Tooltip>}
            >
              <Button
                variant="link"
                className="logout-btn p-0 border-0"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="logout-icon" />
              </Button>
            </OverlayTrigger>
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
