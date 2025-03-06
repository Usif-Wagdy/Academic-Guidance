import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import benefitsData from "../../Data/benefitsData";
import BenefitsModal from "./BenefitsModal";
import { Axios } from "../../api/axios";
import { benefitsDataAPI } from "../../api/Api";

export default function Benefits({ layout = "grid" }) {
  const [showModal, setShowModal] = useState(false);
  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    Axios.get(`${benefitsDataAPI}`).then((res) => setBenefits(res.data));
  }, []);
  return (
    <Container className="mt-3">
      {/* Grid Layout (Displays All Benefits) */}
      {layout === "grid" && (
        <Row xs={1} lg={3}>
          {benefits.map((benefit, i) => (
            <Col key={i} className="mb-4">
              <Card className="p-4 shadow-sm text-start h-100 border-0 ">
                <span className="d-block fs-1 fw-bold text-end mb-2">
                  {benefit.id < 10 ? `0${benefit.id}` : benefit.id}
                </span>
                <Card.Title className="mb-3">{benefit.title}</Card.Title>
                <Card.Text>{benefit.description}</Card.Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Modal Layout (View All Button) */}
      {layout === "modal" && (
        <Button
          className="bg-white border w-sm-100"
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
