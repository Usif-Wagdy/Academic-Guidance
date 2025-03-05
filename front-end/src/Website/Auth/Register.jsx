import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Form, InputGroup, Alert, Spinner } from "react-bootstrap";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Validation Schema
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
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

  // Function to handle API registration request
  const handleRegister = async (values) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("YOUR_REGISTER_API_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      console.log("Registration successful:", data);

      // Store token if needed
      localStorage.setItem("token", data.token);

      // Redirect or show success message
      window.location.href = "/dashboard"; // Example redirect
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={handleRegister}
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

          {/* Name Field */}
          <Form.Group className="mb-4">
            <Form.Label>Name</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text>
                <FaUser />
              </InputGroup.Text>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={values.name}
                onChange={handleChange}
                isInvalid={touched.name && !!errors.name}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.name}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

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
            {loading ? <Spinner animation="border" size="sm" /> : "Register"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
