import { useOutletContext, useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";
import { Img } from "react-image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CourseList() {
  const { courses, handleDelete } = useOutletContext();
  const navigate = useNavigate();

  // Show skeleton until courses are loaded
  if (!courses || courses.length === 0) {
    return (
      <Container className="mt-5">
        <div className="center-flex justify-content-end ">
          <Button
            variant="primary text-light text-end"
            onClick={() => navigate("add")}
            className="mb-3 fs-10px fs-md-14px"
          >
            Add Course
          </Button>
        </div>
        <Row>
          {[...Array(3)].map((_, index) => (
            <Col lg={4} key={index} className="mb-4">
              <Card>
                <Skeleton height={300} />
                <Card.Body>
                  <Skeleton height={20} width="60%" />
                  <div className="between-flex mt-3 text-light">
                    <Skeleton width={100} height={30} />
                    <Skeleton width={30} height={30} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <div className="center-flex justify-content-end ">
        <Button
          variant="primary text-light text-end"
          onClick={() => navigate("add")}
          className="mb-3 fs-10px fs-md-14px"
        >
          Add Course
        </Button>
      </div>
      <Row>
        {courses.map((course) => (
          <Col lg={4} key={course._id} className="mb-4">
            <Card>
              <Img
                src={course.images[0]}
                alt={course.name}
                className="card-img"
                loader={<Skeleton width={300} height={300} />}
                decoding="async"
                loading="lazy"
              />
              <Card.Body>
                <Card.Title>{course.name}</Card.Title>
                <div className="between-flex mt-3 text-light">
                  <Button
                    variant="success"
                    onClick={() => navigate(`${course._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(course._id)}
                  >
                    <FaRegTrashAlt />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
