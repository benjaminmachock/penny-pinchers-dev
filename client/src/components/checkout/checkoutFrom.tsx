import React from "react";
import { Form, Button } from "react-bootstrap";

const styles = {
  formGroup: {
    marginBottom: "1.5rem",
  },
  button: {
    borderRadius: "20px",
    padding: "10px 20px",
    fontWeight: "bold",
  },
};

const CheckoutForm: React.FC<{
  handleCheckout: (e: React.FormEvent) => void;
}> = ({ handleCheckout }) => {
  return (
    <Form onSubmit={handleCheckout}>
      <Form.Group style={styles.formGroup}>
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" required />
      </Form.Group>
      <Form.Group style={styles.formGroup}>
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" required />
      </Form.Group>
      <Form.Group style={styles.formGroup}>
        <Form.Label>Shipping Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your shipping address"
          required
        />
      </Form.Group>
      <Button
        type="submit"
        variant="success"
        style={styles.button}
        className="mt-3"
      >
        Place Order
      </Button>
    </Form>
  );
};

export default CheckoutForm;
