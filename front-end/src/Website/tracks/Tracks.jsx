import { useEffect, useState } from "react";
import { Axios } from "../../api/axios";
import { tracksAPI } from "../../api/Api";
import { Button, Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

export default function Tracks() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    Axios.get(`${tracksAPI}`).then((res) => {
      setTimeout(() => {
        setTracks(res.data);
        setLoading(false);
      }, 1500);
    });
  }, []);

  function openRoadmap(image) {
    setSelectedImage(image);
  }

  function closeRoadmap() {
    setSelectedImage(null);
  }

  const skeletons = [...Array(4)].map((_, i) => (
    <div key={i} className="mb-4 p-3 bg-info shadow-lg">
      <Skeleton height={30} width="50%" />
      <Skeleton height={20} count={2} className="mt-2" />
    </div>
  ));

  const showTracks = tracks.map((track, i) => (
    <motion.div
      key={i}
      className="track-card bg-secondary px-md-5 p-3 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
    >
      <div
        onClick={() => openRoadmap(track.image)}
        style={{ cursor: "pointer" }}
      >
        <h2>{track.name}</h2>
        <div>{track.description}</div>
      </div>
    </motion.div>
  ));

  return (
    <Container className="my-5">
      {loading ? skeletons : showTracks}

      {selectedImage && (
        <div
          className="position-fixed top-0 start-0 vh-100 vw-100 center-flex z-10"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <img
            src={require(`../../Assets/${selectedImage}`)}
            alt="Roadmap"
            style={{ maxWidth: "90%", maxHeight: "85%" }}
          />
          <Button
            className="position-absolute text-white p-2 border-0 p-2 fs-16px"
            variant="primary"
            onClick={closeRoadmap}
            style={{
              top: 80,
              right: 20,
            }}
          >
            Close
          </Button>
        </div>
      )}
    </Container>
  );
}
