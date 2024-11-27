import React from "react";
import { Button } from "react-bootstrap";
import { useCart } from "./cartContext";
import { useNavigate } from "react-router-dom";

const styles = {
  button: {
    borderRadius: "20px",
    padding: "10px 20px",
    fontWeight: "bold",
  },
};

const CartSummary: React.FC = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="text-center mt-4">
      <h3>Total: ${total.toFixed(2)}</h3>
      <Button
        variant="primary"
        style={styles.button}
        onClick={() => navigate("/checkout")}
      >
        Proceed to Checkout
      </Button>
      <Button
        variant="secondary"
        style={{ ...styles.button, marginLeft: "1rem" }}
        onClick={clearCart}
      >
        Clear Cart
      </Button>
    </div>
  );
};

export default CartSummary;
