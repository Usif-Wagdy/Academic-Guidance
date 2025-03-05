import { Col, Container, Row, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Testimonials from "../../Components/Testimonials/Testimonials";
import Benefits from "../../Components/Benefits/Benefits";
import { Axios } from "../../api/axios";
import { useEffect, useState } from "react";
import { coursesAPI } from "../../api/Api";
import BrandPannel from "./BrandPannel";
import HeroMsg from "./HeroMsg";

export default function Home() {
  // courses display
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    Axios.get(`${coursesAPI}`).then((res) => setCourses(res.data));
  }, []);

  const coursesShow = courses.slice(0, 4).map((course, i) => (
    <Col className="mb-4  " key={i}>
      <div className="p-3 p-md-4 bg-white h-100 d-flex flex-column justify-content-between">
        <div>
          <Card key={i} className=" border-0">
            <Card.Img
              variant="top"
              src={require(`../../Assets/courses/${course.images[0]}`)}
              style={{
                maxHeight: "300px",
              }}
            />
          </Card>

          <div className="between-flex flex-wrap py-2">
            <div className="py-2">
              <span className="me-2 py-2 px-3 border rounded-3 fs-14px">
                {course.duration}
              </span>
              <span className="py-2 px-3 border rounded-3 fs-14px">
                {course.level}
              </span>
            </div>

            <div className="fw-bold p-2 fs-14px">By {course.author}</div>
          </div>
        </div>

        <div className="d-flex flex-column">
          <div>
            <h3 className="w-100 ">{course.name}</h3>
            <p className="my-1 ">{course.description}</p>
          </div>
          <Link to={`courses/${course.id}`} className="my-3 ">
            <Button className="bg-info border w-sm-100 w-md-100">
              Get it Now
            </Button>
          </Link>
        </div>
      </div>
    </Col>
  ));

  return (
    <Container className="my-5">
      <HeroMsg />

      <BrandPannel />

      {/* Hero Video STATIC */}
      <Row className="mb-4">
        <img src={require("../../Assets/hero.png")} alt="hero" loading="lazy" />
      </Row>

      {/* Benefits Section API */}
      <Row className="justify-content-center align-items-center ">
        <div className="center-flex flex-wrap">
          <div className="d-flex flex-column col-md-10 col-12 mt-5 mb-3">
            <h2 className="w-100">Benefits</h2>
            <p className="my-1 text-muted">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              eaque vero quidem quisquam porro sint asperiores veritatis ipsum.
              Qua
            </p>
          </div>

          <Link
            to="/"
            className=" col-md-2 col-12 d-flex text-md-end justify-content-center my-3 p-0 "
          >
            <Benefits layout="modal" />
          </Link>
        </div>
      </Row>
      <Benefits layout="grid" />

      {/* Courses Section API */}
      <Row className="justify-content-center align-items-center mt-5">
        <div className="center-flex flex-wrap" id="courses">
          <div className="d-flex flex-column col-md-10 col-12 mb-4">
            <h2 className="w-100">Our Courses</h2>
            <p className="my-1 text-muted">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              eaque vero quidem quisquam porro sint asperiores veritatis ipsum.
              Qua
            </p>
          </div>
          <Link
            to="/courses"
            className=" col-md-2 col-12 d-flex justify-content-md-end justify-content-center my-3 pe-3 "
          >
            <Button className="bg-white border w-sm-100">View All</Button>
          </Link>
        </div>

        <Row xs={1} lg={2}>
          {coursesShow}
        </Row>
      </Row>

      {/* Testimonials Section API */}
      <Row className="justify-content-center align-items-center mt-5 ">
        <div className="center-flex flex-wrap" id="testimonials">
          <div className="d-flex flex-column col-md-10 col-12  mb-3">
            <h2 className="w-100">Our Testimonials</h2>
            <p className="my-1 text-muted">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              eaque vero quidem quisquam porro sint asperiores veritatis ipsum.
              Qua
            </p>
          </div>

          <Link
            to="/"
            className=" col-md-2 col-12 d-flex text-md-end justify-content-center my-3 p-0 "
          >
            <Testimonials layout="modal" />
          </Link>
        </div>
      </Row>
      <Testimonials layout="grid" />
    </Container>
  );
}
