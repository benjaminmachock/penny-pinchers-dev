import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useCart } from "./cartContext";
import CartItem from "./cartItem";
import CartSummary from "./cartSummary";

const Cart: React.FC = () => {
  const { cart } = useCart();

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <Row>
            {cart.map((item) => (
              <Col md={4} key={item.id}>
                <CartItem {...item} />
              </Col>
            ))}
          </Row>
          <CartSummary />
        </>
      )}
    </Container>
  );
};

export default Cart;
