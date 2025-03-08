import { useAuth } from "../../Context/AuthProvider";
import { Navbar, Form, FormControl, Button, Dropdown } from "react-bootstrap";
import { Bell, Maximize } from "react-feather";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaSignOutAlt } from "react-icons/fa";

export default function NavBar() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const handleLogout = () => {
    Cookies.remove("authToken");
    Cookies.remove("userData");
    setAuth(null);
    navigate("/auth/login");
  };

  return (
    <Navbar
      bg="light"
      className="px-3 shadow-sm d-flex justify-content-between align-items-center"
    >
      {/* Search Field */}
      <Form className="d-flex">
        <FormControl type="search" placeholder="Search" className="me-2" />
        <Button variant="outline-primary">Search</Button>
      </Form>

      {/* Right Section */}
      <div className="d-flex align-items-center gap-3">
        <Button variant="light" className="p-2">
          <Bell size={20} />
        </Button>
        <Button variant="light" className="p-2" onClick={toggleFullScreen}>
          <Maximize size={20} />
        </Button>

        {/* Auth Profile Dropdown */}
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            className="d-flex align-items-center  border-0"
          >
            <img
              src={
                auth?.user.profilePicture ||
                "https://www.viverefermo.it/images/user.png"
              }
              alt="Profile"
              className="rounded-circle"
              width="40"
              height="40"
            />
            <div className="ms-2 text-start me-2">
              <div className="fw-bold fs-14px">
                {auth?.user.name.toString().toUpperCase() || "Admin"}
              </div>
              <small className="text-primary">
                {auth?.user.role === "admin" ? "Administrator" : "Instructor"}
              </small>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu align="end" className="p-2">
            <Dropdown.Item className="p-1">Profile</Dropdown.Item>
            <Dropdown.Item className="p-1">Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="p-1 logout-btn" onClick={handleLogout}>
              Logout <FaSignOutAlt size={18} className="ms-2 logout-icon" />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Navbar>
  );
}
