import { useEffect, useState } from "react";
import { Axios } from "../../api/axios";
import { coursesAPI } from "../../api/Api";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { MdOutlineWatchLater } from "react-icons/md";
import { motion } from "framer-motion";
import "./courses.css";

export default function CourseView() {
  const [currCourse, setCurrCourse] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    Axios(`${coursesAPI}/${id}`)
      .then((res) => {
        setCurrCourse(res.data);
        console.log(1);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="between-flex p-5 flex-wrap text-center text-md-start">
          <h2 className="col-12 col-md-5 fs-1">{currCourse.name}</h2>
          <p className="col-12 col-md-6">{currCourse.description}</p>
        </div>

        <div className="w-100 mb-5">
          <img
            style={{ maxHeight: "600px" }}
            src={require(`../../Assets/courses/two-2.jpg`)}
            alt="coursing"
            className="w-100"
          />
        </div>

        <div className="d-flex justify-content-between flex-wrap ">
          {currCourse.curriculum?.map((section, i) => (
            <div
              className="course-card bg-white col-12 p-4 mb-5 rounded-3"
              key={i}
            >
              <h1 className="text-end fs-1 fw-bold">{`0${i + 1}`}</h1>
              <div className="p-2 fs-20px fw-bold mb-4">{section.title}</div>

              <div className="d-flex flex-column">
                {section.parts?.map((part, j) => (
                  <div
                    key={j}
                    className="between-flex flex-md-row flex-column border p-3 mb-3 rounded"
                  >
                    <div className="mb-2">
                      <div>{part.title}</div>
                      <div>{part.numbering}</div>
                    </div>
                    <div className="p-2 bg-info rounded ms-2 fs-14px w-sm-100 text-center text-md-start">
                      <MdOutlineWatchLater className="me-1" />
                      {part.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </Container>
  );
}
