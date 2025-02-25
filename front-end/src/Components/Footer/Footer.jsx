import { Col, Container, Nav, Row } from "react-bootstrap";
import logo from "../../Assets/Logo.png";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaFacebook,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-light text-center py-3 mt-auto shadow-sm">
      <Container>
        <Row className="align-items-center flex-column flex-sm-row">
          <Col>
            <Link to={"/"} className="d-block text-center text-sm-start mb-3">
              <img src={logo} alt="Logo" width="40" height="40" />
            </Link>
            <Row>
              <a
                href="mailto:someone@example.com"
                className="d-flex align-items-center gap-2 ps-3 text-decoration-none text-dark"
              >
                <FaEnvelope /> someone@example.com
              </a>
            </Row>

            <Row>
              <a
                href="tel:+201234567890"
                className="d-flex align-items-center gap-2 ps-3 text-decoration-none text-dark"
              >
                <FaPhone /> +20 123 456 7890
              </a>
            </Row>

            <Row>
              <a
                href="https://www.google.com/maps/search/?q=Cairo,Egypt"
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center gap-2 ps-3 text-decoration-none text-dark"
              >
                <FaMapMarkerAlt /> Cairo, Egypt
              </a>
            </Row>
            <Row></Row>
          </Col>

          <Col>
            <Nav className="flex-column  py-2">
              {[
                { path: "/", label: "Home" },
                { path: "/benefits", label: "Benefits" },
                { path: "/courses", label: "Our Courses" },
                { path: "/testimonials", label: "Testimonials" },
                { path: "/faq", label: "Our FAQ" },
              ].map(({ path, label }) => (
                <Nav.Link
                  key={path}
                  as={Link}
                  to={path}
                  className="text-dark  text-start px-3"
                >
                  {label}
                </Nav.Link>
              ))}
            </Nav>
          </Col>

          <Col>
            <Nav className="flex-column  py-2">
              {[
                { path: "/about", label: "About Us" },
                { path: "/company", label: "Company" },
                { path: "/achievments", label: "Achievments" },
                { path: "/goal", label: "Our Goal" },
              ].map(({ path, label }) => (
                <Nav.Link
                  key={path}
                  as={Link}
                  to={path}
                  className="text-dark text-start px-3"
                >
                  {label}
                </Nav.Link>
              ))}
            </Nav>
          </Col>

          <Col>
            <p className="fw-bold pt-2 fs-5 mb-2">Social Profiles</p>
            <ul className="d-flex justify-content-center gap-3">
              <li>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  className="text-secondary fs-5"
                >
                  <FaFacebook />
                </a>
              </li>

              <li>
                <a
                  href="https://www.x.com/"
                  target="_blank"
                  className="text-secondary fs-5"
                >
                  <FaTwitter />
                </a>
              </li>

              <li>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  className="text-secondary fs-5"
                >
                  <FaLinkedin />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <p className="mb-0 mt-4 text-secondary">
          © 2024 Your Website. All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
}
