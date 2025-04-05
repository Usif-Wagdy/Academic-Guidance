import { useEffect, useState } from "react";
import {
  Form,
  Button,
  Card,
  Accordion,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../../api/axios";
import { coursesAPI } from "../../../../api/Api";
import Breadcrumbs from "../../../../Components/BreadCrumbs/BreadCrumbs";
import { useNotification } from "../../../../Context/Notification";
import { FaRegTrashAlt } from "react-icons/fa";
import { useAuth } from "../../../../Context/AuthProvider";
import { useOutletContext } from "react-router-dom";

export default function CourseForm() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const { showNotification } = useNotification();
  const { setRefreshKey } = useOutletContext();

  const [course, setCourse] = useState({
    name: "",
    description: "",
    duration: "",
    level: "",
    author: auth?.user.name,
    images: [
      "https://dummyimage.com/900x600/dfdfdfdf/ffffff&text=Course+Image",
      "https://dummyimage.com/900x600/dfdfdfdf/ffffff&text=Course+Image",
      "https://dummyimage.com/900x600/dfdfdfdf/ffffff&text=Course+Image",
    ],
    curriculum: [],
  });

  useEffect(() => {
    if (isEditing) {
      Axios.get(`${coursesAPI}/${id}`)
        .then((res) => setCourse(res.data.course))
        .catch((err) => console.error("Error fetching course:", err));
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleImageUrlChange = (index, url) => {
    const updatedImages = [...course.images];
    updatedImages[index] = url;
    setCourse({ ...course, images: updatedImages });
  };

  const handleAddSection = () => {
    setCourse({
      ...course,
      curriculum: [...course.curriculum, { title: "", parts: [] }],
    });
  };

  const handleDeleteSection = (sectionIndex) => {
    const updatedCurriculum = [...course.curriculum];
    updatedCurriculum.splice(sectionIndex, 1);
    setCourse({ ...course, curriculum: updatedCurriculum });
  };

  const handleSectionChange = (index, value) => {
    const updatedCurriculum = [...course.curriculum];
    updatedCurriculum[index].title = value;
    setCourse({ ...course, curriculum: updatedCurriculum });
  };

  const handleAddLesson = (sectionIndex) => {
    const updatedCurriculum = [...course.curriculum];
    updatedCurriculum[sectionIndex].parts.push({
      title: "",
      duration: "",
      numbering: `Lesson ${updatedCurriculum[sectionIndex].parts.length + 1}`,
      demoVideo: "",
    });
    setCourse({ ...course, curriculum: updatedCurriculum });
  };

  const handleDeleteLesson = (sectionIndex, lessonIndex) => {
    const updatedCurriculum = [...course.curriculum];
    updatedCurriculum[sectionIndex].parts.splice(lessonIndex, 1);
    setCourse({ ...course, curriculum: updatedCurriculum });
  };

  const handleLessonChange = (sectionIndex, lessonIndex, field, value) => {
    const updatedCurriculum = [...course.curriculum];
    updatedCurriculum[sectionIndex].parts[lessonIndex][field] = value;
    setCourse({ ...course, curriculum: updatedCurriculum });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await Axios.patch(`${coursesAPI}/${id}`, course);
        showNotification("Course updated successfully!", "success");
      } else {
        await Axios.post(`${coursesAPI}`, course);
        showNotification("New course added!", "success");
      }
      setRefreshKey((prev) => prev + 1); // Trigger a refresh
      navigate("/dashboard/workshop");
    } catch (error) {
      showNotification("Failed to save course!", "danger");
      console.error("Error saving course:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Breadcrumbs title={course.name} />
      <Card className="shadow-lg p-4">
        <h2 className="text-center mb-4">
          {isEditing ? "Edit Course" : "Add a New Course"}
        </h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Course Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={course.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  value={course.author}
                  onChange={handleChange}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Course Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={course.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Duration</Form.Label>
                <Form.Select
                  name="duration"
                  value={course.duration}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Duration</option>
                  <option value="2 Weeks">2 Weeks</option>
                  <option value="4 Weeks">4 Weeks</option>
                  <option value="6 Weeks">6 Weeks</option>
                  <option value="8 Weeks">8 Weeks</option>
                  <option value="10 Weeks">10 Weeks</option>
                  <option value="12 Weeks">12 Weeks</option>
                  <option value="14 Weeks">14 Weeks</option>
                  <option value="5 Months">5 Months</option>
                  <option value="6 Months">6 Months</option>
                  <option value="7 Months">7 Months</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Level</Form.Label>
                <Form.Select
                  name="level"
                  value={course.level}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Form.Label>Image URLs</Form.Label>
            {course.images.map((image, index) => (
              <Col md={4} key={index}>
                <Form.Control
                  type="text"
                  placeholder={`Image URL ${index + 1}`}
                  value={image}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                />
              </Col>
            ))}
          </Row>

          <Button variant="success" onClick={handleAddSection} className="mb-3">
            + Add Section
          </Button>

          <Accordion>
            {course.curriculum.map((section, sectionIndex) => (
              <Accordion.Item
                eventKey={sectionIndex.toString()}
                key={sectionIndex}
              >
                <Accordion.Header>
                  {section.title || `Section ${sectionIndex + 1}`}
                </Accordion.Header>
                <Accordion.Body>
                  <div className="between-flex gap-2 flex-wrap">
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Section Title"
                        value={section.title}
                        onChange={(e) =>
                          handleSectionChange(sectionIndex, e.target.value)
                        }
                        required
                      />
                    </Form.Group>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteSection(sectionIndex)}
                      className="mb-3"
                    >
                      Delete This Section
                    </Button>
                  </div>

                  <div className="between-flex">
                    <Button
                      variant="info"
                      onClick={() => handleAddLesson(sectionIndex)}
                      className="mb-2"
                    >
                      + Add Lesson
                    </Button>
                  </div>

                  {section.parts.map((lesson, lessonIndex) => (
                    <Card key={lessonIndex} className="p-3 mb-2">
                      <div className="between-flex">
                        <div>
                          <Form.Group className="mb-2">
                            <Form.Label>Lesson Title</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Lesson Title"
                              value={lesson.title}
                              onChange={(e) =>
                                handleLessonChange(
                                  sectionIndex,
                                  lessonIndex,
                                  "title",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </Form.Group>
                          <Form.Group className="mb-2">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="e.g., 45 Minutes"
                              value={lesson.duration}
                              onChange={(e) =>
                                handleLessonChange(
                                  sectionIndex,
                                  lessonIndex,
                                  "duration",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </Form.Group>
                          <Form.Group className="mb-2">
                            <Form.Label>Video</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="e.g., https://www.youtube..."
                              value={lesson.demoVideo}
                              onChange={(e) =>
                                handleLessonChange(
                                  sectionIndex,
                                  lessonIndex,
                                  "demoVideo",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </Form.Group>
                        </div>
                        <Button
                          variant="danger"
                          onClick={() =>
                            handleDeleteLesson(sectionIndex, lessonIndex)
                          }
                        >
                          <FaRegTrashAlt />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>

          <Button variant="primary" type="submit" className="mt-4 w-100">
            {isEditing ? "Update Course" : "Submit Course"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
