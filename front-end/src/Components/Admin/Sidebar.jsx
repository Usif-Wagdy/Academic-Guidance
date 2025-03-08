import { NavLink } from "react-router-dom";
import {
  FaList,
  FaChalkboardTeacher,
  FaBlogger,
  FaRoad,
  FaUserTie,
  FaUsers,
  FaBriefcase,
} from "react-icons/fa";
import { MdArrowForwardIos, MdDashboard } from "react-icons/md";

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const menuItems = [
    {
      path: "/dashboard/insights",
      label: "Admin Dashboard",
      icon: <MdDashboard size={22} />,
    },
    {
      path: "/dashboard/cv-template",
      label: "CV Template",
      icon: <FaChalkboardTeacher size={22} />,
    },
    {
      path: "/dashboard/roadmap",
      label: "Roadmap",
      icon: <FaRoad size={22} />,
    },
    { path: "/dashboard/blog", label: "Blog", icon: <FaBlogger size={22} /> },
    {
      path: "/dashboard/internship",
      label: "Internship",
      icon: <FaBriefcase size={22} />,
    },
    {
      path: "/dashboard/instructors",
      label: "Instructor Accounts",
      icon: <FaUsers size={22} />,
    },
    {
      path: "/dashboard/workshop",
      label: "Workshop",
      icon: <FaUserTie size={22} />,
    },
  ];

  return (
    <div
      className="d-flex flex-column bg-light vh-100 p-3 position-fixed"
      style={{
        width: isCollapsed ? "80px" : "300px",
        transition: "width 0.3s ease",
        overflow: "hidden",
      }}
    >
      {/* Sidebar Header */}
      <div className="d-flex align-items-center mb-5">
        <h5
          className="m-0 text-primary text-uppercase fw-bold fs-5"
          style={{
            opacity: isCollapsed ? 0 : 1,
            transform: isCollapsed ? "translateX(-20px)" : "translateX(0)",
            maxWidth: isCollapsed ? "0px" : "200px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            transition:
              "opacity 0.3s ease, transform 0.3s ease, max-width 0.3s ease",
          }}
        >
          edu dashboard
        </h5>

        <button
          className="btn btn-primary btn-sm text-white ms-auto"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <FaList size={24} />
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="nav flex-column">
        {menuItems.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `nav-link d-flex align-items-center py-3 px-3 rounded fs-6 mb-2 ${
                isActive
                  ? "text-primary fw-bold bg-primary bg-opacity-25"
                  : "text-muted"
              }`
            }
          >
            <span className={isCollapsed ? "" : "me-3"}>{icon}</span>
            {!isCollapsed && (
              <span
                style={{
                  opacity: isCollapsed ? 0 : 1,
                  transform: isCollapsed
                    ? "translateX(-20px)"
                    : "translateX(0)",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  transition:
                    "opacity 0.3s ease, transform 0.3s ease, max-width 0.3s ease",
                }}
              >
                {label}
              </span>
            )}
            {!isCollapsed && <MdArrowForwardIos className="ms-auto" />}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
