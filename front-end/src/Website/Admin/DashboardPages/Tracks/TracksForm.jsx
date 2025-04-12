import { useEffect, useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../../api/axios";
import { tracksAPI } from "../../../../api/Api";
import { toast } from "react-toastify";

export default function TracksForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [track, setTrack] = useState({
    name: "",
    description: "",
    sections: [],
  });

  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      Axios.get(`${tracksAPI}/${id}`)
        .then((res) => {
          setTrack(res.data.track);
        })
        .catch((err) => console.error("Error fetching track:", err));
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrack({ ...track, [name]: value });
  };

  const handleAddSection = () => {
    setTrack({
      ...track,
      sections: [
        ...track.sections,
        {
          name: "",
          content: [{ title: "", link: "" }],
        },
      ],
    });
  };

  const handleDeleteSection = (sectionIndex) => {
    const updatedSections = [...track.sections];
    updatedSections.splice(sectionIndex, 1);
    setTrack({ ...track, sections: updatedSections });
  };

  const handleSectionChange = (index, value) => {
    const updatedSections = [...track.sections];
    updatedSections[index].name = value;
    setTrack({ ...track, sections: updatedSections });
  };

  const handleAddContent = (sectionIndex) => {
    const updatedSections = [...track.sections];
    updatedSections[sectionIndex].content.push({ title: "", link: "" });
    setTrack({ ...track, sections: updatedSections });
  };

  const handleDeleteContent = (sectionIndex, contentIndex) => {
    const updatedSections = [...track.sections];
    updatedSections[sectionIndex].content.splice(contentIndex, 1);
    setTrack({ ...track, sections: updatedSections });
  };

  const handleContentChange = (sectionIndex, contentIndex, field, value) => {
    const updatedSections = [...track.sections];
    updatedSections[sectionIndex].content[contentIndex][field] = value;
    setTrack({ ...track, sections: updatedSections });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        toast.info("Updating track...");
        await Axios.patch(`${tracksAPI}/${id}`, track);
        toast.success("Track updated successfully!");
      } else {
        toast.info("Adding new track...");
        await Axios.post(tracksAPI, track);
        toast.success("Track added successfully!");
      }
      navigate("/dashboard/tracks");
    } catch (err) {
      toast.error("Error occurred!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2>{isEditing ? "Edit Track" : "Add New Track"}</h2>
      <Form onSubmit={handleSubmit}>
        <Card>
          <Card.Body>
            <Form.Group controlId="trackName">
              <Form.Label>Track Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={track.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="trackDescription" className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={track.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="mt-4">
              <h5>Sections</h5>
              {track.sections.map((section, sectionIndex) => (
                <Card key={sectionIndex} className="mb-3">
                  <Card.Body>
                    <Form.Group controlId={`section-${sectionIndex}`}>
                      <Form.Label>Section Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={section.name}
                        onChange={(e) =>
                          handleSectionChange(sectionIndex, e.target.value)
                        }
                        required
                      />
                    </Form.Group>

                    <div className="mt-3">
                      <h6>Content</h6>
                      {section.content.map((content, contentIndex) => (
                        <Row key={contentIndex} className="mb-2">
                          <Col>
                            <Form.Control
                              type="text"
                              placeholder="Title"
                              value={content.title}
                              onChange={(e) =>
                                handleContentChange(
                                  sectionIndex,
                                  contentIndex,
                                  "title",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              type="url"
                              placeholder="Link"
                              value={content.link}
                              onChange={(e) =>
                                handleContentChange(
                                  sectionIndex,
                                  contentIndex,
                                  "link",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </Col>
                          <Col>
                            <Button
                              variant="danger"
                              onClick={() =>
                                handleDeleteContent(sectionIndex, contentIndex)
                              }
                            >
                              Delete
                            </Button>
                          </Col>
                        </Row>
                      ))}
                      <Button
                        variant="primary"
                        onClick={() => handleAddContent(sectionIndex)}
                      >
                        Add Content
                      </Button>
                    </div>

                    <Button
                      variant="danger"
                      className="mt-3"
                      onClick={() => handleDeleteSection(sectionIndex)}
                    >
                      Delete Section
                    </Button>
                  </Card.Body>
                </Card>
              ))}
              <Button variant="primary" onClick={handleAddSection}>
                Add Section
              </Button>
            </div>

            <div className="mt-4">
              <Button type="submit" variant="success" disabled={loading}>
                {loading ? "Saving..." : "Save Track"}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Form>
    </Container>
  );
}
