import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Card, Button, Container } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import testimonialsData from "../../Data/testimonialsData";

export default function Testimonials() {
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  return (
    <Container className="mt-3">
      <div className="position-relative">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={false}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop
          className="pb-5"
        >
          {testimonialsData.map(({ id, name, profilePic, testimonial }) => (
            <SwiperSlide key={id}>
              <Card className="p-4 shadow-sm text-start">
                <Card.Text className="text-muted mb-4">{testimonial}</Card.Text>

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
                    onClick={() => navigate("/testimonials")}
                  >
                    Read More
                  </Button>
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="d-flex justify-content-end">
          <Button
            variant="outline-secondary"
            className="swiper-prev-btn me-2"
            onClick={() => swiperRef.current.swiper.slidePrev()}
          >
            <FaArrowLeft />
          </Button>
          <Button
            variant="outline-secondary"
            className="swiper-next-btn"
            onClick={() => swiperRef.current.swiper.slideNext()}
          >
            <FaArrowRight />
          </Button>
        </div>
      </div>
    </Container>
  );
}
