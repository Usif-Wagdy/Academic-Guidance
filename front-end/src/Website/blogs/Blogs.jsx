import { useEffect, useState } from "react";
import { Axios } from "../../api/axios";
import { blogsAPI } from "../../api/Api";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MAX_TEXT_LENGTH = 150;

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(blogsAPI)
      .then((res) => {
        setTimeout(() => {
          setBlogs(res.data);
          setLoading(false);
        }, 1500);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  // Stagger animation for all blogs
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Container className="my-5">
      <div className="mt-lg-5">
        <h1 className="text-center">Blogs</h1>
        <p className="text-center">Read the latest updates and insights.</p>
      </div>

      {/* Skeletons (Only Show When Loading) */}
      {loading && (
        <motion.div className="row g-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div key={i} className="col-12 col-lg-6 col-xl-4">
              <Card className="border-0 bg-light shadow-sm rounded-4">
                <Skeleton height={316} className="rounded-4" />
                <Card.Body>
                  <Skeleton height={27} width="80%" />
                  <Skeleton height={25} width="60%" />
                  <Skeleton height={20} count={3} />
                </Card.Body>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Blogs (Only Show When Data is Loaded) */}
      {!loading && (
        <motion.div
          className="row g-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              className="col-12 col-lg-6 col-xl-4"
              variants={itemVariants}
            >
              <Link to={`/blogs/${blog.id}`} className="text-decoration-none">
                <Card className="border-0 bg-info shadow-sm rounded-4">
                  <Card.Img
                    variant="top"
                    src={require(`../../Assets/blogs/${blog.image}`)}
                    className="rounded-4"
                    loading="lazy"
                    style={{ maxWidth: "100%", height: "316px" }}
                  />
                  <Card.Body>
                    <Card.Title className="text-center fw-bold fs-22px">
                      {blog.title}
                    </Card.Title>
                    <Card.Title className="text-center fs-18px">
                      {blog.date}
                    </Card.Title>
                    <Card.Text className="text-center fs-16px fs-md-18px">
                      {blog.description.length > MAX_TEXT_LENGTH
                        ? `${blog.description.substring(0, MAX_TEXT_LENGTH)}...`
                        : blog.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </Container>
  );
}
