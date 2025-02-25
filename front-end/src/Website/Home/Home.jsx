import { Col, Container, Row, Button } from "react-bootstrap";
import { FaBolt } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();

  return (
    <Container>
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

      <Row className="mb-2">
        <img src={require("../../Assets/hero.png")} alt="hero" />
      </Row>

      <Row className="justify-content-between align-items-center my-4 p-2">
        <Col xs={9}>
          <h2 className="fs-1">Benefits</h2>
          <p className="text-muted">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            eaque vero quidem quisquam porro sint asperiores veritatis ipsum.
            Qua
          </p>
        </Col>

        <Col xs={3} className="text-center">
          <Button
            variant="secondary"
            className="d-inline-block"
            onClick={() => navigate("/benefits")}
          >
            View All
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
