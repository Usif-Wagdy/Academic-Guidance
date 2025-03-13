import React, { useState, useEffect } from "react";
import { Axios } from "../../../../api/axios";
import { blogsAPI } from "../../../../api/Api";
import { Outlet } from "react-router-dom";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await Axios.get(blogsAPI);
      setBlogs(res.data);
    } catch (error) {
      console.error("Error fetching Blogs:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`${blogsAPI}/${id}`);
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="container mt-4">
      {/* Default view is BlogList */}
      <Outlet context={{ blogs, handleDelete }} />
    </div>
  );
};

export default BlogsPage;
