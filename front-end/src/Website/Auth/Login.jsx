import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Form, InputGroup, Alert, Spinner } from "react-bootstrap";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { Axios } from "../../api/axios";
import { usersAPI } from "../../api/Api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Validation Schema
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/\d/, "Must contain at least one number")
      .matches(/[\W_]/, "Must contain at least one special character")
      .required("Password is required"),
  });

  // Function to handle API login request
  const handleLogin = async (values) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await Axios.get(`${usersAPI}`, values).then();

      // console.log(response);

      if (response.status !== 200) {
        throw new Error(errorMessage || "Login failed");
      }

      const { token, userData } = response.data[0];

      // console.log("Login successful:", userData, token);

      // **Store token in cookies**
      Cookies.set("authToken", token, { expires: 7, secure: true });

      // Store user data
      Cookies.set("userData", JSON.stringify(userData), { expires: 7 });

      setAuth({ token: token, user: userData });
      // Redirect to home
      userData.isAdmin ? navigate("/dashboard") : navigate("/");
      
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ email: "", password: "" }}
      onSubmit={handleLogin}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form
          noValidate
          onSubmit={handleSubmit}
          className="w-100"
          style={{ maxWidth: "400px" }}
        >
          {/* Error Message */}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          {/* Email Field */}
          <Form.Group className="mb-4">
            <Form.Label>Email</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text>
                <FaEnvelope />
              </InputGroup.Text>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.email}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Password Field */}
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text>
                <FaLock />
              </InputGroup.Text>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                isInvalid={touched.password && !!errors.password}
              />
              <Button
                variant="outline-secondary"
                onClick={togglePasswordVisibility}
                type="button"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.password}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-100 fw-semibold"
            disabled={loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Login"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
