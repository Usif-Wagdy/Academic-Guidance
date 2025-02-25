import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  FloatingLabel,
  InputGroup,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { FaLeftLong } from "react-icons/fa6";
import "./Auth.css";
import Testimonials from "../../Components/Testimonials/Testimonials";

function Auth() {
  // Location Controllers
  const location = useLocation();
  const navigate = useNavigate();

  // Transition of changing pages
  const [isFading, setIsFading] = useState(false);
  const isLogin = location.pathname === "/login";

  setTimeout(() => {
    setIsFading(true);
  }, 500);

  const toggleForm = () => {
    setIsFading(false);
    setTimeout(() => {
      navigate(isLogin ? "/register" : "/login");
    }, 500);
  };

  // Show or Hide password
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  //   Form Validation
  const [validated, setValidated] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  };

  // Capture form data to send to API
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Update form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // API Submitting
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  }

  return (
    <Container className="d-flex justify-content-around align-items-center min-vh-100 py-4">
      <Row className="w-100 justify-content-center">
        <Col
          lg={7}
          className={`d-none d-lg-block left ${
            isFading ? "fade-in" : "fade-out"
          } `}
        >
          <Button variant="outline-dark" onClick={() => navigate("/")}>
            <FaLeftLong /> Home
          </Button>
          <Row className="align-items-center flex-column justify-content-start h-100 text-center testimonials ">
            <h2 className="mt-4 mb-2 text-start">Students Testimonials</h2>
            <p className="text-start text-secondary mb-4">
              At our academy, we take pride in the success and satisfaction of
              our students. Read real experiences from learners who have
              benefited from our courses, mentorship, and supportive community.
              Whether they've landed their dream job, gained new skills, or
              built confidence in their field, their stories reflect the impact
              of our programs. Check out their testimonials below! 🚀
            </p>
            <Testimonials layout="slider" />
          </Row>
        </Col>

        <Col
          xs={10}
          lg={5}
          className={`p-3 rounded-4 form-box ${
            isFading ? "fade-in" : "fade-out"
          }`}
        >
          <h2 className="text-start text-dark my-4 text-center">
            {isLogin ? "Login" : "Create Account"}
          </h2>
          <p className="mb-3 text-center text-small">
            {isLogin
              ? "Welcome back! Please log in to access your account."
              : "Create your account to unlock exclusive features."}
          </p>

          <Form
            className="w-custom mb-3"
            noValidate
            validated={validated}
            onSubmit={submit}
          >
            {!isLogin && (
              <InputGroup className="mb-3">
                <InputGroup.Text style={{ height: "58px" }}>
                  <FaUser />
                </InputGroup.Text>

                <FloatingLabel
                  label="Enter your name"
                  className="text-secondary"
                >
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please enter your name.
                  </Form.Control.Feedback>
                </FloatingLabel>
              </InputGroup>
            )}

            <InputGroup className="mb-3">
              <InputGroup.Text style={{ height: "58px" }}>
                <FaEnvelope />
              </InputGroup.Text>

              <FloatingLabel
                label="Enter your email"
                className="text-secondary "
              >
                <Form.Control
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  error
                </Form.Control.Feedback>
              </FloatingLabel>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text style={{ height: "58px" }}>
                <FaLock />
              </InputGroup.Text>
              <FloatingLabel
                label="Enter your password"
                className="text-secondary"
              >
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  error
                </Form.Control.Feedback>
              </FloatingLabel>
              <Button
                style={{
                  backgroundColor: "white",
                  borderColor: "#ced4da",
                  height: "58px",
                }}
                onClick={togglePasswordVisibility}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>

            {!isLogin && (
              <InputGroup className="mb-3">
                <InputGroup.Text style={{ height: "58px" }}>
                  <FaLock />
                </InputGroup.Text>

                <FloatingLabel
                  label="Re-enter your password"
                  className="text-secondary"
                >
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    error
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button
                  style={{
                    backgroundColor: "white",
                    borderColor: "#ced4da",
                    height: "58px",
                  }}
                  onClick={toggleConfirmPasswordVisibility}
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
            )}

            <Button
              variant="primary"
              className="w-75 d-block mx-auto fw-semibold "
              //   disabled
              type="submit"
            >
              {isLogin ? "Login" : "Register"}
            </Button>
          </Form>

          <p className="d-flex align-items-center justify-content-center gap-1">
            {isLogin
              ? "Don't have an account yet?"
              : "Already have an account?"}{" "}
            <Button
              variant="link"
              className="fw-semibold p-0"
              onClick={toggleForm}
            >
              {isLogin ? "Register" : "Login"}
            </Button>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Auth;
