import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../../../api/axios";
import { usersAPI } from "../../../../api/Api";
import { Button, Col, Form, Row } from "react-bootstrap";
import { IoMdMail } from "react-icons/io";

export default function EditInstructors() {
  const [instructor, setInstructor] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    country: "",
    gender: "",
    language: "",
    timezone: "",
  });

  const { id } = useParams();

  //Get User Data
  useEffect(() => {
    Axios.get(`${usersAPI}/${id}`)
      .then((res) => setInstructor(res.data.userData))
      .catch((error) => console.log(error));
  }, [id]);

  // Form Changes
  function handleFormChanges(e) {
    const { name, value } = e.target;
    setInstructor((prev) => ({ ...prev, [name]: value }));
  }

  // Handle Submit Form
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await Axios.put(`${usersAPI}/${id}`, {
        token: "TOKEN",
        userData: {
          ...instructor,
          isAdmin: instructor.role === "admin" ? true : false,
        },
      });
      window.location.pathname = "/dashboard/instructors";
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="m-0 m-md-2 mt-md-4">
      <Form className="bg-white p-3" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4 bg-primary p-2 rounded-3">
          Edit Instructor
        </h2>

        <div className="between-flex flex-column flex-md-row mb-3">
          <div className="w-100 between-flex mb-3 mb-md-0">
            <img
              src={
                instructor?.profilePicture
                  ? instructor.profilePicture
                  : "https://www.viverefermo.it/images/user.png"
              }
              alt="img"
              className="w-100px me-3 rounded-circle h-100px"
            />
            <div className="flex-grow-1">
              <p className="m-0">{instructor?.name}</p>
              <p className="m-0" style={{ color: "#b5b5b5" }}>
                {instructor?.email}
              </p>
            </div>
          </div>

          <Button
            variant="primary text-white"
            className="fs-10px fs-md-14px"
            style={{ minWidth: "110px" }}
            type="submit"
          >
            Submit Edit
          </Button>
        </div>

        {/* ======================= */}
        <Row className="mb-3 d-lg-flex d-block">
          <Form.Group as={Col} controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={instructor?.name || ""}
              onChange={handleFormChanges}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="Email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={instructor?.email || ""}
              onChange={handleFormChanges}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="Role" className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              aria-label="Role"
              name="role"
              value={instructor?.role || ""}
              onChange={handleFormChanges}
            >
              <option>Open this select menu</option>
              <option value="admin">Admin</option>
              <option value="instructor">Instructor</option>
            </Form.Select>
          </Form.Group>
        </Row>

        {/* ======================= */}
        <Row className="mb-3 d-lg-flex d-block">
          <Form.Group as={Col} controlId="Country" className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Select
              aria-label="Country"
              name="country"
              value={instructor?.country || ""}
              onChange={handleFormChanges}
            >
              <option>Open this select menu</option>
              <option value="Egypt">Egypt</option>
              <option value="Canada">Canada</option>
              <option value="USA">USA</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="Gender">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              aria-label="Gender"
              name="gender"
              value={instructor?.gender || ""}
              onChange={handleFormChanges}
            >
              <option>Open this select menu</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
          </Form.Group>
        </Row>

        {/* ======================= */}
        <Row className="mb-3 d-lg-flex d-block">
          <Form.Group as={Col} controlId="Language" className="mb-3">
            <Form.Label>Language</Form.Label>
            <Form.Select
              aria-label="Language"
              name="language"
              value={instructor?.language || ""}
              onChange={handleFormChanges}
            >
              <option>Open this select menu</option>
              <option value="Arabic">Arabic</option>
              <option value="English">English</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="Time Zone" className="mb-3">
            <Form.Label>Time Zone</Form.Label>
            <Form.Select
              aria-label="Time Zone"
              name="timezone"
              value={instructor?.timezone || ""}
              onChange={handleFormChanges}
            >
              <option>Open this select menu</option>
              <option value="1 Month">1 Month</option>
              <option value="2 Months">2 Month</option>
              <option value="3 Months">3 Month</option>
              <option value="4 Months">4 Month</option>
              <option value="5 Months">5 Month</option>
              <option value="6 Months">6 Month</option>
            </Form.Select>
          </Form.Group>
        </Row>

        {/* ======================= */}
        {instructor?.email !== "" && (
          <div>
            <h5>My Email Address</h5>
            <div className="d-flex align-items-center">
              <div
                className="me-3 rounded-circle center-flex"
                style={{
                  backgroundColor: "#4182F9",
                  width: "30px",
                  height: "30px",
                }}
              >
                <IoMdMail className="text-primary" />
              </div>
              <div>
                <p className="m-0">{instructor?.email}</p>
                <p className="m-0">{instructor?.timezone}</p>
              </div>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
}
