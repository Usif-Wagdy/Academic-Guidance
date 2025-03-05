import { useEffect, useState } from "react";
import { Axios } from "../../api/axios";
import { coursesAPI } from "../../api/Api";
import { Button, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [visibleItems, setVisibleItems] = useState(2);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios(`${coursesAPI}`).then((res) => {
      setTimeout(() => {
        setCourses(res.data);
        setLoading(false);
      }, 1500);
    });
  }, []);

  const loadMore = () => {
    setTimeout(() => {
      setVisibleItems((prev) => prev + 1);
    }, 1500);
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center my-5 flex-wrap">
        <h1 className="col-md-6 col-12">
          Online Courses on Design and Development
        </h1>
        <p className="col-md-6 col-12 fs-14px">
          Welcome to our online course page, where you can enhance your skills
          in design and development. Choose from our carefully curated selection
          of 10 courses designed to provide you with comprehensive knowledge and
          practical experience. Explore the courses below and find the perfect
          fit for your learning journey.
        </p>
      </div>

      {loading ? (
        <>
          {[...Array(2)].map((_, i) => (
            <div key={i} className="p-3 p-md-5 bg-white mb-5">
              <Skeleton height={40} width={200} className="mb-2" />
              <Skeleton height={20} count={2} className="mb-3" />
              <Skeleton height={350} className="mb-3" />
              <Skeleton height={20} width={100} />
            </div>
          ))}
        </>
      ) : (
        <InfiniteScroll
          dataLength={visibleItems}
          next={loadMore}
          hasMore={visibleItems < courses.length}
          loader={<h4 className="mb-5 text-center">Loading...</h4>}
        >
          {courses.slice(0, visibleItems).map((course, i) => (
            <motion.div
              key={i}
              className="p-3 p-md-5 bg-white mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="center-flex flex-wrap">
                <div className="d-flex flex-column col-lg-10 col-12">
                  <h3 className="w-100">{course.name}</h3>
                  <p className="my-1">{course.description}</p>
                </div>

                <Link
                  to="/"
                  className="col-lg-2 col-12 d-flex justify-content-lg-end justify-content-center my-3"
                >
                  <Button className="bg-info border w-sm-100">
                    View Course
                  </Button>
                </Link>
              </div>

              <div className="between-flex p-2">
                {course.images.map((img, i) => (
                  <Card key={i} className="col-4 p-2 border-0">
                    <Card.Img
                      variant="top"
                      src={require(`../../Assets/courses/${img}`)}
                    />
                  </Card>
                ))}
              </div>

              <div className="between-flex flex-wrap p-2">
                <div className="py-2">
                  -
                  <span className="me-2 py-2 px-3 border rounded-3">
                    {course.duration}
                  </span>
                  <span className="py-2 px-3 border rounded-3">
                    {course.level}
                  </span>
                </div>
                <div className="fw-bold p-2">By {course.author}</div>
              </div>

              <div className="d-flex flex-column border rounded-3 mt-5">
                <div className="fw-bold fs-5 border-bottom p-3">Curriculum</div>
                <div className="d-flex justify-content-between py-3 flex-wrap">
                  {course.curriculum.map((step, i) => (
                    <Card
                      key={i}
                      className="border-0 w-20 w-sm-100"
                      style={{ minWidth: "180px" }}
                    >
                      <Card.Body style={{ borderRight: "1px solid #eee" }}>
                        <Card.Title className="fs-1 fw-bold">{`0${
                          i + 1
                        }`}</Card.Title>
                        <Card.Text className="fs-16px">{step}</Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </InfiniteScroll>
      )}
    </Container>
  );
}
