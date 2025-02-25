import { useState } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";

export default function TestiModal({
  show,
  onClose,
  title,
  contentList,
  imageKey,
}) {
  const [visibleItems, setVisibleItems] = useState(6); // Load 6 items initially

  const loadMore = () => {
    setTimeout(() => {
      setVisibleItems((prev) => prev + 6); // Load 6 more on scroll
    }, 1000);
  };

  return (
    <Modal show={show} onHide={onClose} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <InfiniteScroll
          dataLength={visibleItems}
          next={loadMore}
          hasMore={visibleItems < contentList.length}
          height={400}
        >
          {contentList
            .slice(0, visibleItems)
            .map(({ name, testimonial, [imageKey]: image }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-3"
              >
                <Card className="shadow-sm p-3">
                  <div className="d-flex align-items-center gap-3">
                    {image && (
                      <img
                        src={image}
                        alt={name}
                        className="rounded-circle"
                        width="50"
                        height="50"
                      />
                    )}
                    <Card.Title className="mb-0">{name}</Card.Title>
                  </div>
                  <Card.Text className="text-muted mt-2">
                    {testimonial}
                  </Card.Text>
                </Card>
              </motion.div>
            ))}
        </InfiniteScroll>
      </Modal.Body>
    </Modal>
  );
}
