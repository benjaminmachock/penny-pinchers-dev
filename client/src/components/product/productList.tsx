import React, { useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import type { Product } from "../../interfaces/products";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../../utils/queries";

interface ProductListProps {
  allProducts: Product[];
}

const styles = {
  img: { height: 300, objectFit: "cover", borderRadius: "8px" },
  card: {
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    border: "none",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
  },
  button: {
    borderRadius: "20px",
    padding: "10px 20px",
    fontWeight: "bold",
  },
};

const ProductList: React.FC<ProductListProps> = ({ allProducts }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(
    new Set(allProducts.map((product) => product.category))
  );

  const filteredProducts = selectedCategory
    ? allProducts.filter((product) => product.category === selectedCategory)
    : allProducts;

  return (
    <Container className="my-5">
      <div className="text-center mb-4">
        <Button
          variant="secondary"
          onClick={() => setSelectedCategory(null)}
          className="me-2"
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant="secondary"
            onClick={() => setSelectedCategory(category)}
            className="me-2"
          >
            {category}
          </Button>
        ))}
      </div>
      <Row xs={1} md={3} className="g-4">
        {filteredProducts.map((product) => (
          <Col key={product.id}>
            <Card
              className="h-100"
              style={styles.card as React.CSSProperties}
              onMouseEnter={(e) =>
                ((
                  e.currentTarget as HTMLElement
                ).style.cssText = `transform: ${styles.cardHover.transform}; box-shadow: ${styles.cardHover.boxShadow};`)
              }
              onMouseLeave={(e) =>
                ((
                  e.currentTarget as HTMLElement
                ).style.cssText = `box-shadow: ${styles.card.boxShadow}; transform: none;`)
              }
            >
              <Card.Img
                variant="top"
                src={product.image || "/placeholder.png"}
                alt={product.title}
                style={styles.img as React.CSSProperties}
              />
              <Card.Body>
                <Card.Title className="text-truncate">
                  {product.title}
                </Card.Title>
                <Card.Text className="text-muted">
                  {product.description && product.description.length > 60
                    ? `${product.description.substring(0, 60)}...`
                    : product.description || ""}
                </Card.Text>
                <Card.Text>
                  <strong>Category:</strong> {product.category || "N/A"}
                </Card.Text>
                <Button
                  variant="primary"
                  style={styles.button as React.CSSProperties}
                  onClick={() => {
                    window.location.href = `/product/${product.id}`;
                  }}
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
