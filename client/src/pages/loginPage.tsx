import React, { useState, ChangeEvent, FormEvent } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Login from "../components/login/login";
import { CustomerLogin } from "../interfaces/customerLogin";

const LoginPage: React.FC = () => {
  const [customerData, setCustomerData] = useState<CustomerLogin>({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", customerData);

    localStorage.setItem("customerData", JSON.stringify(customerData));

    setCustomerData({ username: "", password: "" });
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Login
            customer={customerData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
