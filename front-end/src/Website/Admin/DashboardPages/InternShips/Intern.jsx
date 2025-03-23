import { useState, useEffect } from "react";
import { Axios } from "../../../../api/axios";
import { internshipsAPI } from "../../../../api/Api";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Intern() {
  const [internShips, setInternShips] = useState([]);
  const [numOfInterns, setNumOfInterns] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`${internshipsAPI}`).then((res) => {
      setInternShips(res.data);
      setNumOfInterns(res.data.length);
    });
  }, [numOfInterns]);

  // Handle Delete Intern
  const handleDelete = async (id) => {
    try {
      await Axios.delete(`${internshipsAPI}/${id}`);
      setInternShips((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const showInterShips = internShips.map((intern, i) => (
    <div
      key={i}
      className="between-flex flex-column flex-md-row col-12 p-2 bg-secondary mb-3"
    >
      <div className="d-flex">
        <div className="me-2">
          <img
            src={`/Assets/internships/${intern.image}`}
            alt="intern"
            className="w-75px w-md-100px rounded-circle me-md-3"
          />
        </div>
        <div>
          <p className="fw-bold mb-1">{`Company: ${intern.company}`}</p>
          <p className="fw-bold mb-1">{`Track: ${intern.track}`}</p>
          <p className="mb-1">{`Address: ${intern.address}`}</p>
          <p className="mb-1">{`Price: ${intern.price}`}</p>
          <div className="d-flex flex-wrap my-2">
            <span className="me-2 mb-2 mb-md-0">Skills:</span>
            {intern.skills.map((skill, i) => (
              <span
                key={i}
                className="me-2 mb-2 mb-md-0 rounded-3 px-1 fs-12px border border-dark"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="between-flex mt-3 text-light">
        <Button
          variant="success me-2 "
          onClick={() => navigate(`${intern.id}`)}
        >
          Edit
        </Button>
        <Button variant="danger" onClick={() => handleDelete(intern.id)}>
          <FaRegTrashAlt />
        </Button>
      </div>
    </div>
  ));
  return (
    <div className="d-flex flex-wrap">
      <Link
        to="/dashboard/intern-ship/add"
        className="d-flex justify-content-end w-100 py-2"
      >
        <Button variant="primary">Add Intern ship</Button>
      </Link>
      {showInterShips}
    </div>
  );
}
