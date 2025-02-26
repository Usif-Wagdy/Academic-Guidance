import { useEffect, useState } from "react";
import { Axios } from "../../api/axios";
import { blogsAPI } from "../../api/Api";
import { Card, Container } from "react-bootstrap";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    Axios.get(`${blogsAPI}`).then((res) => setBlogs(res.data));
  }, []);

  const showBlogs = blogs.map((blog, i) => (
    <div key={i} className="p-2 col-12 col-md-6 col-lg-4 mb-2 mb-md-5">
      <Card className="border-0 bg-info shadow-sm rounded-4">
        <Card.Img
          variant="top"
          src={require(`../../Assets/blogs/${blog.image}`)}
          className="w-100  rounded-top-4"
        />
        <Card.Body>
          <Card.Title className="text-center fw-bold fs-22px">
            {blog.title}
          </Card.Title>

          <Card.Title className="text-center fs-18px">{blog.date}</Card.Title>

          <Card.Text className="text-center fs-16px fs-md-18px">
            {blog.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  ));

  return (
    <Container className="my-5">
      <div className="mt-lg-5">
        <h1 className="text-center">Blogs</h1>
        <p className="text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          bibendum.
        </p>
      </div>

      <div className="d-flex align-items-center justify-content-between flex-wrap">
        {showBlogs}
      </div>
    </Container>
  );
}
