import React from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "4rem 0",
  },
  card: {
    height: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e0e0e0",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  // cardHover: {
  //   transform: "scale(1.05)",
  //   boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
  // },
  button: {
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    fontWeight: "bold",
    color: "#fff",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  },
  reviews: {
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3f2fd",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  reviewText: {
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#495057",
  },
};

interface CategorySelectorProps {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  setSelectedCategory,
}) => {
  return (
    <Container style={styles.container}>
      <h1 className="text-center mb-4">Select a Category</h1>
      <Row className="mb-5 g-4">
        <Col md={6}>
          <Card
            style={styles.card as React.CSSProperties}
            onMouseEnter={(e) => e.currentTarget as HTMLElement}
            onMouseLeave={(e) => e.currentTarget as HTMLElement}
          >
            <div>
              <h2>SMOKED</h2>
              <Button
                style={styles.button}
                onClick={() => setSelectedCategory("smoked")}
              >
                Select
              </Button>
            </div>
          </Card>
        </Col>
        <Col md={6}>
          <Card
            style={styles.card as React.CSSProperties}
            onMouseEnter={(e) => e.currentTarget as HTMLElement}
            onMouseLeave={(e) => e.currentTarget as HTMLElement}
          >
            <div>
              <h2>FRESH</h2>
              <Button
                style={styles.button}
                onClick={() => setSelectedCategory("fresh")}
              >
                Select
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="text-center g-4">
        <h3 className="mb-4">Reviews</h3>
        <Col md={4}>
          <Card style={styles.reviews}>
            <div style={styles.reviewText}>Review 1: "Amazing products!"</div>
          </Card>
        </Col>
        <Col md={4}>
          <Card style={styles.reviews}>
            <div style={styles.reviewText}>
              Review 2: "Fresh and delicious!"
            </div>
          </Card>
        </Col>
        <Col md={4}>
          <Card style={styles.reviews}>
            <div style={styles.reviewText}>Review 3: "Highly recommended!"</div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CategorySelector;
