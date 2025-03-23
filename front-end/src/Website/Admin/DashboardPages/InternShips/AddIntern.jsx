import { useState } from "react";
import { Axios } from "../../../../api/axios";
import { internshipsAPI } from "../../../../api/Api";
import { Button, Card, Container, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

export default function AddIntern() {
  const [internFrom, setInternFrom] = useState({
    id: "",
    track: "",
    company: "",
    address: "",
    price: "",
    ranking: "",
    image: "dell.png",
  });
  const [skills, setSkills] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setSkills((prevSkills) =>
        checked
          ? [...prevSkills, value]
          : prevSkills.filter((skill) => skill !== value)
      );
    } else {
      setInternFrom((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const newId = uuidv4();

    setInternFrom((prev) => ({ ...prev, skills, id: newId }));

    try {
      await Axios.post(`${internshipsAPI}`, {
        ...internFrom,
        skills,
        id: newId,
      });
      window.location.pathname = "/dashboard/intern-ships";
    } catch (error) {
      console.log(error);
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
              value={internFrom.company}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="track">
            <Form.Label>Track</Form.Label>
            <Form.Control
              type="text"
              name="track"
              value={internFrom.track}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={internFrom.address}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="ranking">
            <Form.Label>Ranking</Form.Label>
            <Form.Control
              type="text"
              name="ranking"
              value={internFrom.ranking}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={internFrom.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Check
            label="HTML"
            checked={skills.includes("HTML")}
            value="HTML"
            onChange={handleChange}
          />
          <Form.Check
            label="CSS"
            checked={skills.includes("CSS")}
            value="CSS"
            onChange={handleChange}
          />
          <Form.Check
            label="JAVASCRIPT"
            checked={skills.includes("JAVASCRIPT")}
            value="JAVASCRIPT"
            onChange={handleChange}
          />
          <Form.Check
            label="REACT"
            checked={skills.includes("REACT")}
            value="REACT"
            onChange={handleChange}
          />
          <Form.Check
            label="NODE"
            checked={skills.includes("NODE")}
            value="NODE"
            onChange={handleChange}
          />

          <Button variant="primary" type="submit" className="mt-4 w-100">
            Submit Intern
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
