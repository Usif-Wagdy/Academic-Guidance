import { useEffect, useState } from "react";
import { Axios } from "../../api/axios";
import { tracksAPI } from "../../api/Api";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";

export default function Tracks() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    Axios.get(`${tracksAPI}`).then((res) => setTracks(res.data));
  }, []);

  const showTracks = tracks.map((track, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-secondary px-md-5 p-3 mb-4">
        <h2>{track.name}</h2>
        <div>{track.description}</div>
      </div>
    </motion.div>
  ));

  return <Container className="my-5">{showTracks}</Container>;
}
