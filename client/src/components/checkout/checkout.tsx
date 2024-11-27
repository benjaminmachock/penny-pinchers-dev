import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CheckoutForm from "./checkoutFrom";
import OrderSummary from "./orderSummary";

const Checkout: React.FC = () => {
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order placed successfully!");
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Checkout</h1>
      <Row>
        <Col md={6}>
          <CheckoutForm handleCheckout={handleCheckout} />
        </Col>
        <Col md={6}>
          <OrderSummary />
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
