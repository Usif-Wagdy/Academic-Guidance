import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Card, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import testimonialsData from "../../Data/testimonialsData";
import ReusableModal from "./TestiModal";

const MAX_TEXT_LENGTH = 100;

export default function Testimonials({ layout = "slider" }) {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const swiperRef = useRef(null);

  // Only Show 4 Testimonials in Slider
  const limitedTestimonials = testimonialsData.slice(0, 4);

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
            autoplay={{ delay: 3000 }}
            loop
            className="pb-5"
          >
            {limitedTestimonials.map(
              ({ id, name, profilePic, testimonial }) => (
                <SwiperSlide key={id}>
                  <Card className="p-4 shadow-sm text-start h-100">
                    <Card.Text className="text-muted mb-4">
                      {testimonial.length > MAX_TEXT_LENGTH
                        ? `${testimonial.substring(0, MAX_TEXT_LENGTH)}...`
                        : testimonial}
                    </Card.Text>
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
                        variant="secondary"
                        onClick={() =>
                          openModal({ id, name, profilePic, testimonial })
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
          {limitedTestimonials.map(({ id, name, profilePic, testimonial }) => (
            <Col key={id} className="mb-4">
              <Card className="p-4 shadow-sm text-start h-100">
                <Card.Text className="text-muted mb-4">
                  {testimonial.length > MAX_TEXT_LENGTH
                    ? `${testimonial.substring(0, MAX_TEXT_LENGTH)}...`
                    : testimonial}
                </Card.Text>
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
                    variant="secondary"
                    onClick={() =>
                      openModal({ id, name, profilePic, testimonial })
                    }
                  >
                    Read More
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : layout === "modal" ? (
        // Button to Open Infinite Scroll Modal
        <Button
          variant="secondary"
          className="d-inline-block fs-7"
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
        <Modal.Body className="text-center">
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
      <ReusableModal
        show={showModal}
        onClose={handleModalClose}
        title="All Testimonials"
        contentList={testimonialsData}
        imageKey="profilePic"
        animate={true}
      />
    </Container>
  );
}
