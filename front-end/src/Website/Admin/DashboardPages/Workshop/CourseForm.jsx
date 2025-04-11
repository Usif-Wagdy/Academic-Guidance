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
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { Axios } from "../../../../api/axios";
import { coursesAPI } from "../../../../api/Api";
import { FaRegTrashAlt } from "react-icons/fa";
import { useAuth } from "../../../../Context/AuthProvider";
import { toast } from "react-toastify";
import ImageDropzone from "../../../../Helpers/ImageDropzone";
import ImageCropperModal from "../../../../Helpers/ImageCropperModal";
import { Img } from "react-image";
import Skeleton from "react-loading-skeleton";

export default function CourseForm() {
  const { auth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isEditing = Boolean(id);
  const { setRefreshKey } = useOutletContext();

  const [course, setCourse] = useState({
    name: "",
    description: "",
    duration: "",
    level: "",
    author: auth?.user.name,
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
    setLoading(true);
    try {
      if (isEditing) {
        toast.info("Updating Course!");
        await Axios.patch(`${coursesAPI}/${id}`, course);
        toast.success("Course updated successfully!");
        navigate("/dashboard/workshop");
      } else {
        toast.info("Adding Course!");
        const { data } = await Axios.post(`${coursesAPI}`, course);
        toast.success("New course added!");
        console.log(data);
        navigate(`/dashboard/workshop/${data.course._id}`);
      }
      setRefreshKey((prev) => prev + 1); // Trigger a refresh
    } catch (error) {
      console.error("Error saving course:", error);
      toast.error("Failed to save course!");
    } finally {
      setLoading(false);
    }
  };

  const [courseImages, setCourseImages] = useState(course?.images || []);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [hintMessage, setHintMessage] = useState("");

  useEffect(() => {
    setCourseImages(course.images);
  }, [course.images]);

  const handleImageSelected = (files) => {
    // Check if the number of selected files is 3
    if (files.length === 3) {
      setSelectedImages(files); // Set selected images
      setHintMessage(""); // Clear any hint message
      toast.info("Please click each image to crop & upload.");
    } else {
      setHintMessage("Please select exactly 3 images.");
      setSelectedImages([]); // Clear previously selected images
    }
  };

  const handleImageToCrop = (image) => {
    setImageToCrop(image); // Set the clicked image to crop
    setShowCropper(true); // Show the cropper modal
  };

  const handleCroppedImage = async (croppedFile) => {
    toast.info("Uploading image...");
    const form_Data = new FormData();
    form_Data.append("images", croppedFile);
    setLoading(true);
    try {
      const { data } = await Axios.post(`${coursesAPI}/${id}`, form_Data);
      setCourseImages(data.course.images);
      setCourse((prevCourse) => ({
        ...prevCourse,
        images: data.course.images,
      }));
      toast.success("Course Image updated!");
    } catch (err) {
      console.error("Error uploading image:", err);
      toast.error("Image upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
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
          {isEditing ? (
            <div className="center-flex flex-column">
              <div
                className="center-flex gap-5 mt-3 mb-2 p-3 bg-secondary rounded-3 w-100"
                style={{ height: "200px" }}
              >
                {courseImages?.length > 0 ? (
                  courseImages.map((image, index) => (
                    <div key={index}>
                      <Img
                        src={image}
                        alt={`Course Image ${index + 1}`}
                        loader={<Skeleton height={160} width={200} />}
                        decoding="async"
                        loading="lazy"
                        className="rounded-3"
                        width={200}
                        height={160}
                      />
                    </div>
                  ))
                ) : (
                  <p>No images uploaded</p>
                )}
              </div>

              <ImageDropzone
                onImageSelected={handleImageSelected}
                multiple={true}
              />

              {selectedImages.length === 3 && (
                <div className="text-center text-light my-3 p-3 bg-dark rounded-3 w-100">
                  <h1>Selected Images</h1>
                  <p className="fw-bold text-danger mt-3 ">
                    Click each image to crop & upload !
                  </p>

                  <div
                    className="center-flex gap-5 "
                    style={{ height: "200px" }}
                  >
                    {selectedImages.map((image, index) => (
                      <div key={index}>
                        <Img
                          src={URL.createObjectURL(image)}
                          alt={`Selected Image ${index + 1}`}
                          loader={<Skeleton height={160} width={200} />}
                          decoding="async"
                          loading="lazy"
                          className="rounded-3 pointer"
                          width={200}
                          height={160}
                          onClick={() => handleImageToCrop(image)} // Set this image for cropping
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Show hint message if selected images is not 3 */}
              {hintMessage && <p className="text-danger">{hintMessage}</p>}

              <ImageCropperModal
                file={imageToCrop}
                show={showCropper}
                onClose={() => setShowCropper(false)}
                onCropComplete={handleCroppedImage}
                aspect={16 / 9}
              />
            </div>
          ) : (
            <div
              className="center-flex text-muted mt-3 mb-4 p-3 bg-secondary rounded-3 w-100 "
              style={{ height: "200px" }}
            >
              <strong>Save the course first to upload images.</strong>
            </div>
          )}

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

          <div className="d-flex justify-content-between mt-4">
            <Button
              variant="secondary"
              onClick={() => navigate("/dashboard/workshop")}
              disabled={loading}
            >
              {loading ? "Cancelling..." : "Cancel"}
            </Button>
            <Button variant="success" type="submit" disabled={loading}>
              {loading
                ? "Saving..."
                : isEditing
                ? "Update Course"
                : "Add Course"}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
