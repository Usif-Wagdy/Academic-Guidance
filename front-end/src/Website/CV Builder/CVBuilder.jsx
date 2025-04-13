import { Button, Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { Axios } from "../../api/axios";
import { downloadTemplateAPI, analyzeCvAPI } from "../../api/Api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function CVBuilder() {
  const user = Cookies.get("userData");
  const isAuthenticated = user ? true : false;
  const navigate = useNavigate();

  const handleDownload = async () => {
    if (!isAuthenticated) {
      navigate("/Oops");
      return;
    }

    try {
      const response = await Axios.get(downloadTemplateAPI, {
        responseType: "blob", // Ensure the response is in blob format (for file download)
      });

      // Create a new Blob object using the response data
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "cv.pdf";
      link.click();

      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleUpload = async () => {
    if (!isAuthenticated) {
      navigate("/Oops");
      return;
    }
  };

  return (
    <Container className="my-5">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="between-flex flex-wrap mb-5">
          <div className="col-12 col-md-5 p-5 bg-secondary rounded-circle">
            <img src="/Assets/cv builder/man.png" className="w-100" alt="man" />
          </div>
          <div className="col-12 col-md-7 text-md-start text-center px-3">
            <h2 className="fs-60px mb-4">
              Build your <span className="text-danger">perfect</span> CV
            </h2>
            <p className="fs-18px">
              Create a new standout CV in minutes or choose any template and
              simply import all the information from your existing CV.
            </p>
          </div>
        </div>

        {/* Combined Feature Card */}
        <div className="bg-secondary rounded-4 p-5">
          <Row className="align-items-center">
            {/* Left Content */}
            <Col md={6} className="text-center text-md-start">
              <h2 className="mb-3">Level up your career with smart CV tools</h2>
              <p className="mb-4 fs-5">
                Discover jobs that truly fit you and stand out with a
                professional, AI-enhanced resume. Our tools ensure your CV is
                tailored, clean, and recruiter-ready.
              </p>
              <div className="d-flex flex-column flex-md-row gap-3 justify-content-center justify-content-md-start">
                <Button
                  variant="dark"
                  className="fs-5 px-4"
                  onClick={handleUpload}
                >
                  Upload My CV
                </Button>
                <Button
                  variant="outline-success"
                  className="fs-5 px-4"
                  onClick={handleDownload}
                >
                  Download Template
                </Button>
              </div>
            </Col>

            {/* Right Image */}
            <Col md={6} className="mt-4 mt-md-0">
              <img
                src="/Assets/cv builder/n1.png"
                className="w-100 rounded-3 shadow"
                alt="cv preview"
              />
            </Col>
          </Row>
        </div>
      </motion.div>
    </Container>
  );
}
