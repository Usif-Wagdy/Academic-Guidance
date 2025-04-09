import React, { useState, useEffect } from "react";
import { Axios } from "../../../../api/axios";
import { coursesAPI } from "../../../../api/Api";
import { Outlet } from "react-router-dom";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchCourses();
  }, [refreshKey]);

  const fetchCourses = async () => {
    try {
      const res = await Axios.get(coursesAPI);
      setCourses(res.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`${coursesAPI}/${id}`);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="container mt-4">
      {/* Default view is CourseList */}
      <Outlet context={{ courses, handleDelete, setRefreshKey }} />
    </div>
  );
};

export default CoursesPage;
