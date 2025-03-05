import { useEffect, useState } from "react";
import { Axios } from "../../api/axios";
import { tracksAPI } from "../../api/Api";
import { Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

export default function Tracks() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${tracksAPI}`).then((res) => {
      setTimeout(() => {
        setTracks(res.data);
        setLoading(false);
      }, 1500);
    });
  }, []);

  // Skeleton placeholders
  const skeletons = [...Array(4)].map((_, i) => (
    <div key={i} className="mb-4 p-3 bg-secondary">
      <Skeleton height={30} width="50%" />
      <Skeleton height={20} count={2} className="mt-2" />
    </div>
  ));

  // Staggered animation for tracks
  const showTracks = tracks.map((track, i) => (
    <motion.div
      key={i}
      className="track-card bg-secondary px-md-5 p-3 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
    >
      <h2>{track.name}</h2>
      <div>{track.description}</div>
    </motion.div>
  ));

  return (
    <Container className="my-5">{loading ? skeletons : showTracks}</Container>
  );
}
