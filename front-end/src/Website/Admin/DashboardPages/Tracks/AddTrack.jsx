import { useState } from "react";
import { Axios } from "../../../../api/axios";
import { tracksAPI } from "../../../../api/Api";
import { Button, Container, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid"; // استيراد uuid

export default function AddTrack() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const newId = uuidv4();

    try {
      await Axios.post(`${tracksAPI}`, {
        id: newId,
        title: title,
        description: description,
        image: "roadmap.jpg",
      });

      window.location.pathname = "/dashboard/tracks";
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container className="center-flex ">
      <Form
        className="my-5 w-50 bg-white p-3 rounded shadow-lg border"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center mb-4">Add Track</h2>
        <Form.Group className="mb-3" controlId="Title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            maxLength={500}
          />
        </Form.Group>

        {/* Not Working */}
        <Form.Group className="mb-3" controlId="Image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files.item(0))}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
