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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${internshipsAPI}`)
      .then((res) => {
        setInternships(res.data.interns);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const showInternships = internships.map((intern, _id) => (
    <div
      key={_id}
      className="w-100 bg-info mb-4 p-3 border rounded-4 between-flex shadow-sm flex-column flex-md-row"
    >
      <div className="d-flex mb-sm-4 flex-md-row flex-column align-items-center align-items-sm-start">
        <div>
          <img
            className="w-75px w-md-100px rounded-circle me-md-3"
            src={`/Assets/internships/shopify.png`}
            alt="internImg"
          />
        </div>

        <div className="d-flex flex-column align-items-center align-items-sm-start">
          <span className="fs-20px ">{intern.company}</span>
          <h2
            className="m-0 fw-bold text-center text-md-start fs-22px fs-md-30px"
            style={{ letterSpacing: "5px" }}
          >
            {intern.track}
          </h2>
          <div className="d-flex flex-wrap flex-column flex-sm-row align-items-center align-items-sm-start">
            <span className="p-2 shadow-sm rounded-4 me-sm-4 fs-18px text-center">
              {intern.place}
            </span>
            <span className="p-2 shadow-sm rounded-4 fs-18px fw-bold">
              <FaSackDollar className="text-warning " /> {intern.salary}
            </span>
          </div>
        </div>
      </div>

      <div className="between-flex flex-wrap flex-column flex-sm-row  ">
        {intern.keywords.map((skill, i) => (
          <span
            key={i}
            className="border px-2 py-1 mb-3 fs-20px rounded-4 me-md-3"
          >
            {skill}
          </span>
        ))}
      </div>
      <span className="fw-bold m-3">
        <GiPin className="text-danger" />
        {intern.duration}
      </span>

      <Button
        className="text-dark fw-bold shadow-sm border-0 fs-22px px-4 rounded-4 ms-2 w-sm-100"
        variant="outline-secondary"
        size="lg"
      >
        Apply
      </Button>
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
      <div className="bg-secondary p-0 my-5 rounded-4 pb-3 container">
        <div className="bg-light between-flex flex-wrap p-2 p-sm-5">
          <div className="center-flex  col-md-7 col-12 ">
            <h1 className="fs-md-60px fs-30px w-75 fw-bold">
              Showcase Your <br /> <span className="text-danger">Skills</span>
              <br />
              Find Your Career <br /> <span className="text-danger">Fit</span>!
            </h1>
          </div>
          <div className="col-12 col-md-5">
            <img
              src="Assets/internships/online-intern.png"
              alt="intern"
              className="w-100 rounded-5"
            />
          </div>
        </div>

        <div className="between-flex flex-wrap align-items-center py-3 px-3 bg-light">
          <div className="col-12 col-md-6 text-center text-md-start ">
            <div className="center-flex  col-md-7 col-12 ">
              <h2 className="fs-md-60px fs-30px w-75 fw-bold text-start">
                Get The <br /> <span className="text-danger">Experience</span>{" "}
                You
                <br /> Need
              </h2>
            </div>

            <div className="between-flex flex-wrap mt-4">
              <img
                src="/Assets/internships/shopify.png"
                alt="Shopify"
                className="brand-logo me-3 mb-3 w-100px"
              />
              <img
                src="/Assets/internships/github.png"
                alt="GitHub"
                className="brand-logo me-3 mb-3 w-100px"
              />
              <img
                src="/Assets/internships/target.png"
                alt="Target"
                className="brand-logo me-3 mb-3 w-100px"
              />
              <img
                src="/Assets/internships/p&g.png"
                alt="P&G"
                className="brand-logo me-3 mb-3 w-100px"
              />
              <img
                src="/Assets/internships/amazon.png"
                alt="Amazon"
                className="brand-logo me-3 mb-3 w-100px"
              />
              <img
                src="/Assets/internships/fox.png"
                alt="Fox"
                className="brand-logo me-3 mb-3 w-100px"
              />
              <img
                src="/Assets/internships/dell-2.png"
                alt="Dell"
                className="brand-logo me-3 mb-3 w-100px"
              />
            </div>
          </div>

          <div className="col-12 col-md-4">
            <img
              src="/Assets/internships/locations.jpg"
              alt="img"
              className="w-100 rounded-3 shadow-sm"
            />
          </div>
        </div>

        <div className="mx-5">
          <div className="d-flex  align-items-center py-2 my-2">
            <Button variant="secondary" className="shadow-sm me-3">
              Add Filter <FaCirclePlus className="ms-2 text-danger" />
            </Button>
            <span className="border border-danger rounded-4 text-danger py-1 px-2">
              45 New jobs posted today
            </span>
          </div>

          {loading ? skeletons : showInternships}
          {}
        </div>
      </div>
    </motion.div>
  );
}
