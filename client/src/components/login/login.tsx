import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import AuthService from "../../utils/auth";
import axios from "axios";

const Login: React.FC = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      interface LoginResponse {
        token: string;
      }

      const response = await axios.post<LoginResponse>("/login", {
        username: formState.username,
        password: formState.password,
      });

      if (response.data && response.data.token) {
        AuthService.login(response.data.token);
      } else {
        setError("Invalid login response from server.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <Row>
        <Col>
          <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white">
            <h2 className="text-center mb-4">Sign into your account</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formState.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
