import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { CustomerLogin } from "../../interfaces/customerLogin";

interface CustomerProps {
  customer: CustomerLogin | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const Login: React.FC<CustomerProps> = ({
  customer,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <Row>
        <Col>
          <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white">
            <h2 className="text-center mb-4">Sign into your account</h2>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={customer?.username || ""}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={customer?.password || ""}
                onChange={handleChange}
                placeholder="Enter your password"
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
