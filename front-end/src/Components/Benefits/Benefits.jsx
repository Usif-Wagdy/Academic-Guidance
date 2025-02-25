import { useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import benefitsData from "../../Data/benefitsData";
import BenefitsModal from "./BenefitsModal";

export default function Benefits({ layout = "grid" }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Container className="mt-3">
      {/* Grid Layout (Displays All Benefits) */}
      {layout === "grid" && (
        <Row xs={1} lg={3}>
          {benefitsData.map(({ id, title, description }) => (
            <Col key={id} className="mb-4">
              <Card className="p-4 shadow-sm text-start h-100 ">
                <span className="d-block fs-1 fw-bold text-end mb-2">
                  {id < 10 ? `0${id}` : id}
                </span>
                <Card.Title className="mb-3">{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Modal Layout (View All Button) */}
      {layout === "modal" && (
        <Button
          variant="secondary"
          className="d-inline-block fs-7"
          onClick={() => setShowModal(true)}
        >
          View All
        </Button>
      )}

      {/* Full View Modal */}
      <BenefitsModal
        show={showModal}
        onClose={() => setShowModal(false)}
        contentList={benefitsData}
      />
    </Container>
  );
}
