import { Col, Container, Row, Button, Card } from "react-bootstrap";
import { FaBolt } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Testimonials from "../../Components/Testimonials/Testimonials";
import Benefits from "../../Components/Benefits/Benefits";
export default function Home() {
  const navigate = useNavigate();

  return (
    <Container>
      {/* Hero msg */}
      <Row className="text-center ">
        <Col className="my-4">
          <h1
            className="d-inline-block py-3 px-2"
            style={{ backgroundColor: "#FCFCFD" }}
          >
            <FaBolt /> <span className="text-primary">Unlock</span> Your
            Creative Potential
          </h1>
          <h2 className="mb-3">with Online Design and Development Courses.</h2>
          <p>Learn from Industry Experts and Enhance Your Skills.</p>
        </Col>
      </Row>

      {/* Hero Button */}
      <Row>
        <Col className="d-flex justify-content-center">
          <Button
            variant="primary d-inline-block"
            onClick={() => navigate("/courses")}
          >
            Explore Courses
          </Button>
        </Col>
      </Row>

      {/* Brand Pannel STATIC */}
      <Row
        className="py-4 px-3 my-5 text-center"
        style={{ backgroundColor: "#FCFCFD" }}
      >
        <Col>
          <img src={require("../../Assets/brand-1.png")} alt="" />
        </Col>
        <Col>
          <img src={require("../../Assets/brand-2.png")} alt="" />
        </Col>
        <Col>
          <img src={require("../../Assets/brand-3.png")} alt="" />
        </Col>
        <Col>
          <img src={require("../../Assets/brand-4.png")} alt="" />
        </Col>
        <Col>
          <img src={require("../../Assets/brand-5.png")} alt="" />
        </Col>
        <Col>
          <img src={require("../../Assets/brand-6.png")} alt="" />
        </Col>
        <Col>
          <img src={require("../../Assets/brand-7.png")} alt="" />
        </Col>
      </Row>

      {/* Hero Video STATIC */}
      <Row className="mb-2">
        <img src={require("../../Assets/hero.png")} alt="hero" />
      </Row>

      {/* Benefits Section STATIC */}
      <Row className="justify-content-center align-items-center">
        <Col xs={12} lg={9}>
          <h2 className="fs-1">Benefits</h2>
          <p className="text-muted">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            eaque vero quidem quisquam porro sint asperiores veritatis ipsum.
            Qua
          </p>
        </Col>

        <Col xs={12} lg={3} className="text-center">
          <Benefits layout="modal" />
        </Col>
      </Row>
      <Benefits layout="grid" />

      {/* Courses Section API */}
      <Row className="justify-content-center align-items-center">
        <Col xs={12} lg={9}>
          <h2 className="fs-1">Our Courses</h2>
          <p className="text-muted">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            eaque vero quidem quisquam porro sint asperiores veritatis ipsum.
            Qua
          </p>
        </Col>

        <Col xs={12} lg={3} className="text-center">
          <Button
            variant="secondary"
            className="d-inline-block fs-7"
            onClick={() => navigate("/courses")}
          >
            View All
          </Button>
        </Col>
      </Row>

      {/* Testimonials Section API */}
      <Row className="justify-content-center align-items-center">
        <Col xs={12} lg={9}>
          <h2 className="fs-1">Our Testimonials</h2>
          <p className="text-muted">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            eaque vero quidem quisquam porro sint asperiores veritatis ipsum.
            Qua
          </p>
        </Col>

        <Col xs={12} lg={3} className="text-center">
          <Testimonials layout="modal" />
        </Col>
      </Row>
      <Testimonials layout="grid" />
    </Container>
  );
}
