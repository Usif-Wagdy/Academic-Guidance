import { Container, Row } from "react-bootstrap";
import Testimonials from "../../Components/Testimonials/Testimonials";
import Benefits from "../../Components/Benefits/Benefits";
import BrandPannel from "./BrandPannel";
import HeroMsg from "./HeroMsg";
import CoursesSection from "./CoursesSection";
import SectionsHeads from "./SectionsHeads";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Container className="my-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HeroMsg />

        <BrandPannel />

        {/* Hero Video STATIC */}
        <Row className="mb-4">
          <img src={`/Assets/hero.png`} alt="hero" loading="lazy" />
        </Row>

        {/* Benefits Section API */}
        <SectionsHeads
          id="benefits"
          title="Benefits"
          content={<Benefits layout="modal" />}
          description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              eaque vero quidem quisquam porro sint asperiores veritatis ipsum.
              Qua"
        />
        <Benefits layout="grid" />

        <CoursesSection />

        {/* Testimonials Section API */}
        <SectionsHeads
          id="testimonials"
          title="Our Testimonials"
          content={<Testimonials layout="modal" />}
          description=" Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
              eaque vero quidem quisquam porro sint asperiores veritatis ipsum.
              Qua"
        />
        <Testimonials layout="grid" />
      </motion.div>
    </Container>
  );
}
