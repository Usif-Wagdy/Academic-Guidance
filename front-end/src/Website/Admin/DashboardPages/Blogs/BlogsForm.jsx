import { useEffect, useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../../api/axios";
import { blogsAPI } from "../../../../api/Api";
import Breadcrumbs from "../../../../Components/BreadCrumbs/BreadCrumbs";
import { useAuth } from "../../../../Context/AuthProvider";
import { toast } from "react-toastify";

export default function BlogForm() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  console.log(isEditing);

  const [blog, setBlog] = useState({
    title: "",
    author: auth?.user.name,
    image: "https://dummyimage.com/300x200/dfdfdfdf/ffffff&text=Blog+Image",
    duration: "",
    date: new Date().toDateString(),
    description: "",
  });

  useEffect(() => {
    if (isEditing) {
      Axios.get(`${blogsAPI}/${id}`)
        .then((res) => setBlog(res.data))
        .catch((err) => console.error("Error fetching blog:", err));
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleImageChange = (e) => {
    setBlog({ ...blog, image: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await Axios.put(`${blogsAPI}/${id}`, blog);
        toast.success("Blog updated successfully!");
      } else {
        await Axios.post(blogsAPI, blog);
        toast.success("New blog added!");
      }
      navigate("/dashboard/blogs");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to save blog!");
      console.error("Error saving blog:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Breadcrumbs title={blog.title} />
      <Card className="shadow-lg p-4">
        <h2 className="text-center mb-4">
          {isEditing ? "Edit Blog" : "Add a New Blog"}
        </h2>
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <Form.Group className="mb-3 col-4">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={blog.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 col-4">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={blog.author}
                onChange={handleChange}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3 col-4">
              <Form.Label>Duration</Form.Label>
              <Form.Select
                name="duration"
                value={blog.duration}
                onChange={handleChange}
                required
              >
                <option value="">Select duration</option>
                <option value="2 min read">2 min read</option>
                <option value="4 min read">4 min read</option>
                <option value="6 min read">6 min read</option>
                <option value="8 min read">8 min read</option>
                <option value="10 min read">10 min read</option>
              </Form.Select>
            </Form.Group>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={blog.image}
              onChange={handleImageChange}
              // required={!isEditing}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={blog.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            {isEditing ? "Update Blog" : "Submit Blog"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
