import { useState } from "react";
import { Modal, Card, Button, Form } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";
import { Axios } from "../../api/axios";
import { coursesAPI } from "../../api/Api";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";

export default function TestiModal({
  show,
  onClose,
  title,
  contentList,
  imageKey,
  courseNames,
}) {
  const [visibleItems, setVisibleItems] = useState(6); // Load 6 items initially
  const [showInput, setShowInput] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const courseLocation =
    window.location.pathname.split("/")[1].toString() === "courses";

  const dashLocation =
    window.location.pathname.split("/")[1].toString() === "dashboard";

  const loadMore = () => {
    setTimeout(() => {
      setVisibleItems((prev) => prev + 6);
    }, 1000);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await Axios.post(`${coursesAPI}/${id}/testimonials`, {
        testimonial: newComment,
      });
      setNewComment("");
      setShowInput(false);
    } catch (error) {
      console.log("Error submitting testimonial:", error);
    }
  };

  const deleteTesti = async (testiId) => {
    if (!testiId) {
      console.log("Testimonial ID is not defined");
      return;
    }

    try {
      await Axios.delete(`${coursesAPI}/${id}/testimonials/${testiId}`);
    } catch (error) {
      console.log("Error deleting testimonial:", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InfiniteScroll
          dataLength={visibleItems}
          next={loadMore}
          hasMore={visibleItems < contentList.length}
          height={400}
        >
          {contentList
            .slice(0, visibleItems)
            .map(
              (
                { name, testimonial, _id, courseId, [imageKey]: image },
                index
              ) => (
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
                    <Card.Text className="text-muted mt-2 between-flex">
                      {testimonial}
                      {dashLocation && (
                        <MdDelete
                          className="fs-16px text-danger pointer"
                          onClick={() => deleteTesti(_id)}
                        />
                      )}
                    </Card.Text>
                    {courseId && (
                      <div className="mt-2">
                        <strong className="text-muted">Course: </strong>
                        <span className="text-primary">
                          {courseNames[courseId] || "Course name not found"}
                        </span>
                      </div>
                    )}
                  </Card>
                </motion.div>
              )
            )}
        </InfiniteScroll>

        {courseLocation && (
          <>
            <Button
              className="w-100 mt-3"
              onClick={() => setShowInput(!showInput)}
            >
              {showInput ? "Cancel" : "Add Testimonials"}
            </Button>

            {showInput && (
              <div className="mt-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Write your testimonial..."
                  maxLength={45}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button
                  className="mt-2 w-100"
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                >
                  Add
                </Button>
              </div>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
