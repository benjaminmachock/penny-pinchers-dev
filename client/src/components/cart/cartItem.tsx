import React from "react";
import { Card, Button } from "react-bootstrap";
import { useCart } from "./cartContext";

interface CartItemProps {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

const styles = {
  card: {
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    border: "none",
    marginBottom: "1rem",
  },
  button: {
    borderRadius: "20px",
    padding: "10px 20px",
    fontWeight: "bold",
  },
};

const CartItem: React.FC<CartItemProps> = ({ id, title, price, quantity }) => {
  const { removeFromCart } = useCart();

  return (
    <Card style={styles.card}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <strong>Price:</strong> ${price.toFixed(2)} <br />
          <strong>Quantity:</strong> {quantity}
        </Card.Text>
        <Button
          variant="danger"
          style={styles.button}
          onClick={() => removeFromCart(id)}
        >
          Remove
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CartItem;
