import { useOutletContext, useNavigate, useLocation } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";

export default function CourseList() {
  const { courses,  handleDelete } = useOutletContext();
  const navigate = useNavigate();



  return (
    <Container className="mt-5">
      <div className="center-flex">
        <Button onClick={() => navigate("add")} className="mb-3 ">
          Add Course
        </Button>
      </div>
      <Row>
        {courses.map((course) => (
          <Col lg={4} key={course._id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={course.images[0]}
                alt={course.name}
                style={{ minWidth: "326px", height: "300px" }}
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
