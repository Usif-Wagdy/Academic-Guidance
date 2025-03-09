import { Button, Col, Container, Row } from "react-bootstrap";

export default function CVBuilder() {
  return (
    <Container className="my-5">
      <div className="between-flex flex-wrap ">
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

      <div className="my-5 bg-secondary rounded-3 p-5">
        <div>
          <Row>
            <h2 className="mb-3">
              Stand out from the crowd with a top notch resume
            </h2>
            <ul className="ms-4 mb-5 ">
              <li className="py-1">
                Get a professional quality resume in minutes, not hours
              </li>
              <li className="py-1">
                Keep tailoring your resume with AI and catch HR’s eyes in 6
                seconds
              </li>
              <li className="py-1">
                Rest easy knowing your resume will be ATS compatible
              </li>
            </ul>
          </Row>
          <Row>
            <div className="col-12 col-md-6 center-flex">
              <Button variant="dark" className="fs-30px px-3">
                Download CV
              </Button>
            </div>
            <div className="col-12 col-md-6 p-5 bg-secondary rounded-circle">
              <img
                src="/Assets/cv builder/n2.png"
                className="w-100"
                alt="man"
              />
            </div>
          </Row>
        </div>
      </div>

      <div className="my-5 bg-secondary rounded-3 p-5">
        <div>
          <Row>
            <h2 className="mb-3">improve CV</h2>
            <p>
              AI Job Match / Job searching is already hard! Increase your odds
              with AI matched Jobs
            </p>

            <ul className="ms-4 mb-5 ">
              <li className="py-1">Apply only to Jobs you are qualified for</li>
              <li className="py-1">
                Discover matched jobs based on your skills, not only titles
              </li>
              <li className="py-1">Say goodbye to fake jobs</li>
              <li className="py-1">Apply early with our custom job alerts</li>
            </ul>
          </Row>
          <Row>
            <div className="col-12 col-md-6 center-flex">
              <Button variant="dark" className="fs-30px px-3">
                Upload my CV
              </Button>
            </div>
            <div className="col-12 col-md-6 p-5 bg-secondary rounded-circle">
              <img
                src="/Assets/cv builder/n1.png"
                className="w-100"
                alt="man"
              />
            </div>
          </Row>
        </div>
      </div>
    </Container>
  );
}
