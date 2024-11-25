import React from "react";
import { Card, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../interfaces/products";
import { FaShoppingCart } from "react-icons/fa";

interface ProductProps {
  product: Product;
}

import type { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
    backgroundColor: "#f8f9fa",
    padding: "rem",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "22rem",
    width: "100%",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    cursor: "pointer",
    backgroundColor: "#ffffff",
  },
  img: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
  },
  cardBody: {
    padding: "1.5rem",
    textAlign: "center",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#333",
  },
  cardText: {
    fontSize: "1rem",
    color: "#6c757d",
    marginBottom: "1.5rem",
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    border: "none",
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "5px",
    color: "#fff",
    fontWeight: "bold",
    transition: "background-color 0.3s ease-in-out",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <Container style={styles.container as React.CSSProperties}>
      <Card
        style={styles.card as React.CSSProperties}
        onClick={handleCardClick}
      >
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.title}
          style={styles.img as React.CSSProperties}
        />
        <Card.Body style={styles.cardBody}>
          <Card.Title style={styles.cardTitle}>{product.title}</Card.Title>
          <Card.Text style={styles.cardText}>
            {product.description.length > 60
              ? `${product.description.substring(0, 60)}...`
              : product.description}
          </Card.Text>
          <Button
            style={styles.button as React.CSSProperties}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                styles.buttonHover.backgroundColor || "";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                styles.button.backgroundColor || "";
            }}
          >
            <FaShoppingCart />
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductCard;
