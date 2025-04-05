import { useEffect, useState } from "react";
import { Axios } from "../../../../api/axios";
import { tracksAPI } from "../../../../api/Api";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";

export default function AllTracks() {
  const [tracks, setTracks] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    Axios.get(`${tracksAPI}`).then((res) => setTracks(res.data));
  }, []);

  // Handle Delete Intern
  const handleDelete = async (id) => {
    try {
      await Axios.delete(`${tracksAPI}/${id}`);
      setTracks((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const showTracks = tracks.map((track, i) => (
    <div key={i} className="col-12 col-md-6 p-2 ">
      <div className="bg-white py-2">
        <h2 className="text-center">{track.title}</h2>
        <p className="text-center fs-12px fs-md-16px p-2">
          {track.description}
        </p>
        <div className="center-flex p-3 mt-3 text-light">
          <Button variant="success me-2 " onClick={() => nav(`${track.id}`)}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => handleDelete(track.id)}>
            <FaRegTrashAlt />
          </Button>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <div className="center-flex mb-2">
        <Button variant="primary" onClick={() => nav(`/dashboard/track/add`)}>
          Add Track
        </Button>
      </div>
      <div className="d-flex flex-wrap">{showTracks}</div>
    </div>
  );
}
