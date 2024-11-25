import React from "react";
import { Card, Button } from "react-bootstrap";
import type { Product } from "../../interfaces/products";

interface ProductProps {
  product: Product;
}

const styles = {
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    padding: "2rem",
    backgroundColor: "#f8f9fa",
  },
  card: {
    maxWidth: "40rem",
    width: "100%",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  cardBody: {
    padding: "1.5rem",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  cardText: {
    fontSize: "1rem",
    color: "#6c757d",
    marginBottom: "1rem",
  },
  price: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#000",
    marginBottom: "1.5rem",
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    border: "none",
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "5px",
  },
};

const Product: React.FC<ProductProps> = ({ product }) => {
  const { title, price, description, image, updatedAt } = product;

  return (
    <div style={styles.cardContainer}>
      <Card style={styles.card as React.CSSProperties}>
        <Card.Img
          variant="top"
          src={image || "/images/placeholder.png"}
          alt={title || "Product Image"}
          style={styles.img as React.CSSProperties}
        />
        <Card.Body style={styles.cardBody}>
          <Card.Title style={styles.cardTitle}>
            {title || "Untitled Product"}
          </Card.Title>
          <Card.Text style={styles.cardText}>
            {description || "No description available."}
          </Card.Text>
          {price !== null && (
            <Card.Text style={styles.price}>
              <strong>Price:</strong> ${price.toFixed(2)}
            </Card.Text>
          )}
          {updatedAt && (
            <Card.Text style={styles.cardText}>
              <small>
                Last updated {new Date(updatedAt).toLocaleDateString()}
              </small>
            </Card.Text>
          )}
          <Button style={styles.button}>Add to Cart</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
