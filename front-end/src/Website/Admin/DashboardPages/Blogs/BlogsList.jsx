import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";

export default function BlogList() {
  const { blogs, handleDelete } = useOutletContext();
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <div className="center-flex">
        <Button onClick={() => navigate("add")} className="mb-3 ">
          Add Blog
        </Button>
      </div>
      <Row>
        {blogs.map((blog) => (
          <Col lg={4} key={blog.id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={blog.image}
                alt={blog.title}
                style={{ minWidth: "326px", height: "300px" }}
              />
              <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text className="text-muted">
                  {blog.date} {blog.duration ? "- " + blog.duration : ""}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="success"
                    onClick={() => navigate(`${blog.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(blog.id)}
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
