import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import logo from "../../Assets/Logo.png";

export default function Header() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname.startsWith("/profile")) {
      setActiveLink("/profile");
    } else {
      setActiveLink(location.pathname);
    }
  }, [location]);

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
          <Nav className="mx-auto gap-lg-4 p-3">
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
                className={activeLink === path ? "fw-bold text-primary" : ""}
              >
                {label}
              </Nav.Link>
            ))}
          </Nav>

          {/* Login & Signup (Inside the Collapsible Menu) */}
          <Nav className="d-lg-none flex-column text-center">
            <Button
              variant={activeLink == "/login" ? "primary" : "outline-primary"}
              as={Link}
              to="/login"
              className="mb-2 py-1"
            >
              Login
            </Button>
            <Button
              variant={
                activeLink == "/register" ? "primary" : "outline-primary"
              }
              as={Link}
              to="/signup"
              className="py-1"
            >
              Register
            </Button>
          </Nav>
        </Navbar.Collapse>

        {/* Desktop View - Login & Signup (Outside the Collapse) */}
        <Nav className="ms-auto d-none d-lg-flex">
          <Button
            variant={activeLink == "/register" ? "primary" : "outline-primary"}
            as={Link}
            to="/register"
            className="me-2 py-1 px-2"
          >
            Register
          </Button>
          <Button
            variant={activeLink == "/login" ? "primary" : "outline-primary"}
            as={Link}
            to="/login"
            className="py-1 px-3"
          >
            Login
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}
