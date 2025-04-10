import { useState } from "react";
import { Axios } from "../../../../api/axios";
import { internshipsAPI } from "../../../../api/Api";
import { Button, Card, Container, Form } from "react-bootstrap";

export default function AddIntern() {
  const [internForm, setInternForm] = useState({
    id: "",
    company: "",
    place: "",
    salary: "",
    duration: "",
    sponser: "",
    image: "dell.png",
    keywords: [],
  });
  const [imageFile, setImageFile] = useState(null);

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setInternForm((prev) => ({
        ...prev,
        keywords: checked
          ? [...prev.keywords, value]
          : prev.keywords.filter((skill) => skill !== value),
      }));
    } else {
      setInternForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Submit Form
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await Axios.post(`${internshipsAPI}`, internForm);
      const newInternId = response.data?.intern._id;

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        await Axios.post(
          `${internshipsAPI}/add-image/${newInternId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      window.location.pathname = "/dashboard/intern-ships";
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <Container className="mt-5">
      <Card className="shadow-lg p-4">
        <h2 className="text-center mb-4">Add Intern</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="company">
            <Form.Label>Company</Form.Label>
            <Form.Control
              type="text"
              name="company"
              value={internForm.company}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="place">
            <Form.Label>Place</Form.Label>
            <Form.Control
              type="text"
              name="place"
              value={internForm.place}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="duration">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="text"
              name="duration"
              value={internForm.duration}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="sponser">
            <Form.Label>Sponser</Form.Label>
            <Form.Control
              type="text"
              name="sponser"
              value={internForm.sponser}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="salary">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              type="text"
              name="salary"
              value={internForm.salary}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              onChange={(e) => {
                const file = e.target.files[0];
                const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
                if (file && !allowedTypes.includes(file.type)) {
                  alert("Only JPG, JPEG, and PNG formats are allowed.");
                  e.target.value = null;
                  return;
                }
                setImageFile(file);
              }}
              required
            />
          </Form.Group>

          {/* Checkboxes */}
          <Form.Check
            label="HTML"
            checked={internForm.keywords.includes("HTML")}
            value="HTML"
            onChange={handleChange}
          />
          <Form.Check
            label="CSS"
            checked={internForm.keywords.includes("CSS")}
            value="CSS"
            onChange={handleChange}
          />
          <Form.Check
            label="JAVASCRIPT"
            checked={internForm.keywords.includes("JAVASCRIPT")}
            value="JAVASCRIPT"
            onChange={handleChange}
          />
          <Form.Check
            label="REACT"
            checked={internForm.keywords.includes("REACT")}
            value="REACT"
            onChange={handleChange}
          />
          <Form.Check
            label="NODE"
            checked={internForm.keywords.includes("NODE")}
            value="NODE"
            onChange={handleChange}
          />
          <Form.Check
            label="AI"
            checked={internForm.keywords.includes("AI")}
            value="AI"
            onChange={handleChange}
          />
          <Form.Check
            label="Software"
            checked={internForm.keywords.includes("Software")}
            value="Software"
            onChange={handleChange}
          />
          <Form.Check
            label="Internship"
            checked={internForm.keywords.includes("Internship")}
            value="Internship"
            onChange={handleChange}
          />

          <Button variant="primary" type="submit" className="mt-4 w-100">
            Add Intern
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
