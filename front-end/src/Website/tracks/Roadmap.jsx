import { useLocation } from "react-router-dom";
import { Card, Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";

export default function Roadmap() {
  const location = useLocation();
  const track = location.state?.track;

  if (!track || !track.roadmap) {
    return <p>Track not found or no roadmap available.</p>;
  }

  return (
    <Container className="my-5">
      {track.roadmap.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <Card className="border-0 bg-info shadow-sm rounded-4 px-md-5 p-3 mb-4">
            <Card.Title>Step {i + 1}</Card.Title>
            <Card.Body>
              <p>{step.description}</p>
              {step.link && (
                <Button
                  variant="primary"
                  href={step.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
                </Button>
              )}
            </Card.Body>
          </Card>
        </motion.div>
      ))}
    </Container>
  );
}
