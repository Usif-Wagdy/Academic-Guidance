import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Testimonials from "../../Components/Testimonials/Testimonials";
import "./Auth.css";

function Auth() {
  // Location Controllers
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === "/auth/login";

  return (
    <Container className="d-flex justify-content-around align-items-center min-vh-100 py-4">
      <Row className="w-100 justify-content-center align-items-center">
        <Col lg={7} className="d-none d-lg-block left fade-in">
          <Row className="align-items-center flex-column justify-content-start h-100 text-center testimonials ">
            <h2 className="mt-4 mb-2 text-start">Students Testimonials</h2>
            <p className="text-start text-muted mb-4">
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

        <Col xs={11} md={8} lg={5} className="p-3 rounded-4 form-box fade-in">
          <div>
            <h2 className="text-start text-dark my-4 text-center">
              {isLogin ? "Login" : "Create Account"}
            </h2>
            <p className="mb-3 text-center text-small">
              {isLogin
                ? "Welcome back! Please log in to access your account."
                : "Create your account to unlock exclusive features."}
            </p>
          </div>

          {/* Outlet to Render Login or Register */}
          <Outlet />

          {/* Toggle Between Forms */}
          <p className="d-flex align-items-center justify-content-center gap-1">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Button
              variant="link"
              className="fw-semibold p-0"
              onClick={() =>
                navigate(isLogin ? "/auth/register" : "/auth/login")
              }
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
