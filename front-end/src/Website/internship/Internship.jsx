import { useEffect, useState } from "react";
import { Axios } from "../../api/axios";
import { internshipsAPI } from "../../api/Api";
import { Button } from "react-bootstrap";
import { FaSackDollar, FaCirclePlus } from "react-icons/fa6";
import { GiPin } from "react-icons/gi";
import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";

export default function Internships() {
  const [internships, setInternships] = useState([]);
  const [numberOFInterns, setNumberOFInterns] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${internshipsAPI}`)
      .then((res) => {
        setInternships(res.data.interns);
        setNumberOFInterns(res.data.interns.length);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const showInternships = internships.map((intern, _id) => (
    <div key={_id} className="w-100 bg-info rounded-4 shadow-sm mb-4">
      <div className="p-3 between-flex flex-column flex-md-row">
        <div className="d-flex flex-md-row flex-column align-items-center w-sm-100">
          <div className="mb-2">
            <img
              className="w-75px w-md-100px h-75px h-md-100px rounded-circle me-md-3"
              src={intern?.image}
              alt="internImg"
            />
          </div>

          <div className="flex-column flex-sm-row d-flex align-items-center justify-content-around flex-wrap w-100">
            <span className="p-2 shadow-sm rounded-4 me-md-4 fs-18px text-center">
              {intern.company}
            </span>
            <h2
              className="m-0 fw-bold text-center text-md-start fs-22px fs-md-30px"
              style={{ letterSpacing: "5px" }}
            >
              {intern.track}
            </h2>
            <span className="p-2 shadow-sm rounded-4 me-md-4 fs-18px text-center">
              {intern.place}
            </span>
            <span className="p-2 shadow-sm rounded-4 fs-18px">
              <FaSackDollar className="text-warning " /> {intern.salary}
            </span>
          </div>
        </div>

        <span className="fw-bold m-3">
          <GiPin className="text-danger" />
          {intern.duration}
        </span>
      </div>

      <div className="d-flex align-items-center justify-content-around flex-wrap  flex-sm-row w-7 px-3">
        {intern.keywords.map((skill, i) => (
          <span key={i} className="border px-2 py-1 mb-2 fs-16px rounded-4 ">
            {skill}
          </span>
        ))}
      </div>

      <div className="center-flex py-3">
        <Button
          className="text-dark fw-bold shadow-sm border-0 fs-18px p-2 rounded-4 w-50 w-md-25"
          variant="outline-primary"
          size="lg"
        >
          Apply
        </Button>
      </div>
    </div>
  ));

  const skeletons = [...Array(4)].map((_, i) => (
    <div
      key={i}
      className="w-100 mb-4 bg-light p-3 border rounded-3 between-flex shadow-sm flex-column flex-md-row"
    >
      <div className="d-flex mb-sm-4 flex-md-row flex-column align-items-center align-items-sm-start">
        <div>
          <Skeleton circle width={75} height={75} className="me-md-3" />
        </div>

        <div className="d-flex flex-column align-items-center align-items-sm-start">
          <Skeleton height={20} width={100} className="mb-2" />
          <Skeleton height={30} width={150} className="mb-2" />
          <div className="d-flex flex-wrap flex-column flex-sm-row align-items-center align-items-sm-start">
            <Skeleton
              height={25}
              width={80}
              className="p-2 shadow-sm rounded-4 me-sm-4 mb-2"
            />
            <Skeleton
              height={25}
              width={100}
              className="p-2 shadow-sm rounded-4 mb-2"
            />
          </div>
        </div>
      </div>

      <div className="between-flex flex-wrap flex-column flex-sm-row">
        {[...Array(3)].map((_, i) => (
          <Skeleton
            key={i}
            height={20}
            width={60 + i * 20}
            className="px-2 py-1 mb-3  rounded-4 me-md-3"
          />
        ))}
      </div>

      <span className="m-3 d-flex">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="me-1" height={20} width={50} />
        ))}
      </span>

      <Skeleton height={40} width={120} className="rounded-4 ms-2 " />
    </div>
  ));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-secondary p-0 my-md-4 rounded-4 pb-3 container">
        <div className="bg-secondary p-2 p-sm-5 shadow-lg mb-4 text-center">
          <h1 className="fs-md-60px fs-30px fw-bold">
            Showcase Your <br /> <span className="text-danger">Skills</span>
            <br />
            Find Your Career <br /> <span className="text-danger">Fit</span>!
          </h1>
        </div>

        <div className="mx-5">
          <div className="d-flex  align-items-center py-2 my-2">
            {/* <Button variant="secondary" className="shadow-sm me-3">
              Add Filter <FaCirclePlus className="ms-2 text-danger" />
            </Button> */}
            <span className="border border-danger rounded-4 text-danger py-1 px-2">
              {numberOFInterns} New jobs posted
            </span>
          </div>

          {loading ? skeletons : showInternships}
        </div>
      </div>
    </motion.div>
  );
}
