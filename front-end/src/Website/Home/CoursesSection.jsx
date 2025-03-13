import { useEffect, useState } from "react";
import { coursesAPI } from "../../api/Api";
import { Axios } from "../../api/axios";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import SectionsHeads from "./SectionsHeads";

export default function CoursesSection() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    Axios.get(`${coursesAPI}`).then((res) => setCourses(res.data));
  }, []);

  const coursesShow = courses.slice(0, 4).map((course, i) => (
    <Col className="mb-4" key={i}>
      <div className="p-3 p-md-4 bg-white h-100 d-flex flex-column justify-content-between">
        <div>
          <Card key={i} className=" border-0">
            <Card.Img
              variant="top"
              src={course.images[0]}
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
    <div className="mt-5">
      <SectionsHeads
        id="courses"
        title="Our Courses"
        to="/courses"
        content={
          <Button className="bg-white border w-sm-100 m-0">View All</Button>
        }
        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            eaque vero quidem quisquam porro sint asperiores veritatis ipsum.
            Qua"
      />

      <Row xs={1} lg={2}>
        {coursesShow}
      </Row>
    </div>
  );
}
