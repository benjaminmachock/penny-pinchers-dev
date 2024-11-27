import React from "react";
import { useCart } from "../cart/cartContext";

const OrderSummary: React.FC = () => {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h3 className="mb-3">Order Summary</h3>
      {cart.map((item) => (
        <p key={item.id}>
          {item.title} x {item.quantity} = $
          {(item.price * item.quantity).toFixed(2)}
        </p>
      ))}
      <h4>Total: ${total.toFixed(2)}</h4>
    </div>
  );
};

export default OrderSummary;
