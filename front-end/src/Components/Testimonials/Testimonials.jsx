import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Card, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TestiModal from "./TestiModal";
import { Axios } from "../../api/axios";
import { coursesAPI, testimonialsAPI } from "../../api/Api";

const MAX_TEXT_LENGTH = 100;

export default function Testimonials({ layout = "slider" }) {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [courseNames, setCourseNames] = useState({});
  const swiperRef = useRef(null);

  // Only Show 4 Testimonials in Slider
  const limitedTestimonials = testimonials.slice(0, 4);

  // Open modal for full testimonial
  const openModal = (testimonial) => {
    setSelectedTestimonial(testimonial);
  };

  // Close modal
  const closeModal = () => {
    setSelectedTestimonial(null);
  };

  // Close full view
  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // Fetch testimonials
    Axios.get(testimonialsAPI).then((res) => {
      const fetchedTestimonials = res.data.testimonials;
      setTestimonials(fetchedTestimonials);

      // Fetch course names based on courseId from each testimonial
      const courseIds = [
        ...new Set(fetchedTestimonials.map((t) => t.courseId)),
      ]; // Unique courseIds
      courseIds.forEach((courseId) => {
        Axios.get(`${coursesAPI}/${courseId}`).then((res) => {
          setCourseNames((prevState) => ({
            ...prevState,
            [courseId]: res.data.course.name, // Store course name by courseId
          }));
        });
      });
    });
  }, []);

  return (
    <Container className="mt-3">
      {/* Slider Layout */}
      {layout === "slider" ? (
        <div className="position-relative">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: ".swiper-prev-btn",
              nextEl: ".swiper-next-btn",
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 1200 }}
            className="pb-5"
          >
            {limitedTestimonials.map(
              ({ _id, name, profilePic, testimonial, courseId }) => (
                <SwiperSlide key={_id}>
                  <Card className="p-4 shadow-sm text-start h-100">
                    <Card.Text className="text-muted mb-2">
                      {testimonial.length > MAX_TEXT_LENGTH
                        ? `${testimonial.substring(0, MAX_TEXT_LENGTH)}...`
                        : testimonial}
                    </Card.Text>
                    <div className="text-start mb-2 text-muted ps-2">
                      <small>Course: {courseNames[courseId]}</small>
                    </div>
                    <div className="d-flex align-items-center justify-content-between gap-3">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={profilePic}
                          alt={name}
                          className="rounded-circle"
                          width="60"
                          height="60"
                        />
                        <Card.Title>{name}</Card.Title>
                      </div>
                      <Button
                        className="btn-info border w-sm-100"
                        onClick={() =>
                          openModal({
                            _id,
                            name,
                            profilePic,
                            testimonial,
                            courseId,
                          })
                        }
                      >
                        Read More
                      </Button>
                    </div>
                  </Card>
                </SwiperSlide>
              )
            )}
          </Swiper>
          {/* Navigation Buttons */}
          <div className="d-flex justify-content-end mt-3">
            <Button
              variant="outline-secondary"
              className="swiper-prev-btn me-2"
            >
              <FaArrowLeft />
            </Button>
            <Button variant="outline-secondary" className="swiper-next-btn">
              <FaArrowRight />
            </Button>
          </div>
        </div>
      ) : layout === "grid" ? (
        // Grid Layout (4 Cards Max)
        <Row xs={1} lg={2}>
          {limitedTestimonials.map(
            ({ _id, name, profilePic, testimonial, courseId }) => (
              <Col key={_id} className="mb-4">
                <Card className="p-4 shadow-sm text-start h-100 border-0">
                  <Card.Text className="text-muted mb-4 text-center text-md-start">
                    {testimonial.length > MAX_TEXT_LENGTH
                      ? `${testimonial.substring(0, MAX_TEXT_LENGTH)}...`
                      : testimonial}
                  </Card.Text>
                  <div className="text-start mb-2 text-muted ps-2">
                    <small>Course: {courseNames[courseId]}</small>
                  </div>
                  <div className="center-flex justify-content-md-between flex-column flex-md-row gap-3">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={profilePic}
                        alt={name}
                        className="rounded-circle"
                        width="60"
                        height="60"
                      />
                      <Card.Title>{name}</Card.Title>
                    </div>
                    <Button
                      className="btn-info border w-sm-100"
                      onClick={() =>
                        openModal({
                          _id,
                          name,
                          profilePic,
                          testimonial,
                          courseId,
                        })
                      }
                    >
                      Read More
                    </Button>
                  </div>
                </Card>
              </Col>
            )
          )}
        </Row>
      ) : layout === "modal" ? (
        // Button to Open Infinite Scroll Modal
        <Button
          className="btn-white border w-sm-100"
          onClick={() => setShowModal(true)}
        >
          View All
        </Button>
      ) : null}

      {/* Full Testimonial Modal */}
      <Modal
        show={!!selectedTestimonial}
        onHide={closeModal}
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedTestimonial?.name}</Modal.Title>
        </Modal.Header>
        {selectedTestimonial?.courseId && (
          <div className="text-muted  p-3">
            <small className="fw-bold">Course:</small>{" "}
            <span className="text-primary">
              {courseNames[selectedTestimonial?.courseId] ||
                "Course name not found"}
            </span>
          </div>
        )}
        <Modal.Body className="center-flex flex-column">
          <img
            src={selectedTestimonial?.profilePic}
            alt={selectedTestimonial?.name}
            className="rounded-circle mb-3"
            width="80"
            height="80"
          />
          <Card.Text className="text-muted">
            {selectedTestimonial?.testimonial}
          </Card.Text>
        </Modal.Body>
      </Modal>

      {/* Infinite Scroll Modal (View All) */}
      <TestiModal
        show={showModal}
        onClose={handleModalClose}
        title="All Testimonials"
        contentList={testimonials}
        imageKey="profilePic"
        animate={true}
        courseNames={courseNames}
      />
    </Container>
  );
}
