import { useState, useEffect } from "react";
import { Axios } from "../../../../api/axios";
import { usersAPI } from "../../../../api/Api";
import { Button, Table } from "react-bootstrap";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Instructors() {
  const [instructors, setInstructors] = useState([]);
  const [numOfInstructos, setNumOfInstructos] = useState(0);

  useEffect(() => {
    Axios.get(`${usersAPI}`)
      .then((res) => {
        setInstructors(res.data);
        setNumOfInstructos(res.data.length);
      })
      .catch((error) => console.log(error));
  }, [numOfInstructos]);

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`${usersAPI}/${id}`);
      setInstructors((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const showInstructors = instructors.map((instructor, i) => {
    const userData = instructor.userData;

    return (
      <tr className="text-center fs-8px fs-md-14px" key={i}>
        <td className="p-1 p-md-2">{instructor.id.slice(0, 2)}</td>
        <td className="p-1 p-md-2">{userData?.name}</td>
        <td className="p-1 p-md-2">{userData?.email}</td>
        <td className="p-1 p-md-2">{userData?.role}</td>
        <td className="p-1 p-md-2">{userData?.country}</td>
        <td className="p-1 p-md-2">{userData?.gender}</td>
        <td className="p-1 p-md-2">{userData?.language}</td>
        <td className="p-1 p-md-2">{userData?.timezone}</td>
        <td className="p-1 p-md-2">
          <Link to={`${instructor.id}`} className="me-1">
            <FaUserEdit />
          </Link>
          {
            <MdDelete
              onClick={() => handleDelete(instructor.id)}
              className="text-danger pointer"
            />
          }
        </td>
      </tr>
    );
  });
  return (
    <div className="m-0 m-md-2">
      <div className="d-flex justify-content-end my-2 pt-3">
        <Button
          variant="primary text-white"
          className="fs-10px fs-md-14px"
          onClick={() =>
            (window.location.pathname = "/dashboard/instructor/add")
          }
        >
          Add Instructor
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center bg-primary fs-8px fs-md-14px">
            <th className="bg-primary p-1 p-md-2">Id</th>
            <th className="bg-primary p-1 p-md-2">Name</th>
            <th className="bg-primary p-1 p-md-2">Email</th>
            <th className="bg-primary p-1 p-md-2">Role</th>
            <th className="bg-primary p-1 p-md-2">Country</th>
            <th className="bg-primary p-1 p-md-2">Gender</th>
            <th className="bg-primary p-1 p-md-2">Language</th>
            <th className="bg-primary p-1 p-md-2">Time Zone</th>
            <th className="bg-primary p-1 p-md-2">Action</th>
          </tr>
        </thead>
        <tbody>{showInstructors}</tbody>
      </Table>
    </div>
  );
}
