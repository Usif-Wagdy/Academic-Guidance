import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Axios } from "../../api/axios";
import { blogsAPI } from "../../api/Api";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import BreadCrumbs from "../../Components/BreadCrumbs/BreadCrumbs";

export default function BlogView() {
  const { id } = useParams(); // Get blog ID from URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    Axios.get(`${blogsAPI}/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!blog) return <h2 className="text-center mt-5">Loading...</h2>;

  return (
    <Container className="my-5">
      <BreadCrumbs title={blog.title} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-5">
          <h1 className="text-center mb-4">{blog.title}</h1>
          <p className="px-4">
            by <span className="text-capitalize">{blog.author}</span> on{" "}
            {blog.date}
          </p>
          <img
            src={require(`../../Assets/blogs/${blog.image}`)}
            alt="blog"
            className="w-100 rounded-4 "
            style={{ width: "100%", height: "700px" }}
          />
          <p className="text-start fs-16px fs-md-18px mt-5 px-4">
            {blog.description}
          </p>
        </div>
      </motion.div>
    </Container>
  );
}
