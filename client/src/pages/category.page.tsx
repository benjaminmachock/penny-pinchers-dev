import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Product from "../components/product/productCard"; // Import your Product card
import type { Product as ProductType } from "../interfaces/products";

// Mock Product Data
const mockProducts: ProductType[] = [
  {
    id: 1,
    title: "Smoked Salmon",
    price: 25.99,
    description: "Premium smoked salmon, perfect for special occasions.",
    category: "smoked",
    image: "/images/smoked-salmon.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "Fresh Tuna",
    price: 18.99,
    description: "Freshly caught tuna, ideal for sushi and sashimi.",
    category: "fresh",
    image: "/images/fresh-tuna.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: "Smoked Trout",
    price: 20.99,
    description: "Delicious smoked trout, a gourmet treat.",
    category: "smoked",
    image: "/images/smoked-trout.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    title: "Fresh Salmon",
    price: 22.99,
    description: "Fresh salmon fillet, perfect for grilling.",
    category: "fresh",
    image: "/images/fresh-salmon.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const CategorySelectorPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "all"
  );

  // Filter products based on the selected category
  const filteredProducts =
    selectedCategory === "all"
      ? mockProducts
      : mockProducts.filter((product) => product.category === selectedCategory);

  return (
    <Container>
      {/* Category Navigation Buttons */}
      <Row className="mb-4 text-center">
        <Col>
          <Button
            variant={
              selectedCategory === "smoked" ? "primary" : "outline-primary"
            }
            onClick={() => setSelectedCategory("smoked")}
          >
            Smoked Products
          </Button>
        </Col>
        <Col>
          <Button
            variant={
              selectedCategory === "fresh" ? "success" : "outline-success"
            }
            onClick={() => setSelectedCategory("fresh")}
          >
            Fresh Products
          </Button>
        </Col>
        <Col>
          <Button
            variant={
              selectedCategory === "warning" ? "warning" : "outline-warning"
            }
            onClick={() => setSelectedCategory("all")}
          >
            All Products
          </Button>
        </Col>
      </Row>

      {/* Product Grid */}
      <Row>
        {filteredProducts.map((product) => (
          <Col key={product.id} md={6} lg={4} className="mb-4">
            <Product product={product} />
          </Col>
        ))}
      </Row>

      {/* Reviews Section */}
      <Row className="mt-5 text-center">
        <h3>Reviews</h3>
        <Col md={4}>
          <div className="p-3 border bg-light">"Amazing quality products!"</div>
        </Col>
        <Col md={4}>
          <div className="p-3 border bg-light">"Great value for money!"</div>
        </Col>
        <Col md={4}>
          <div className="p-3 border bg-light">
            "Highly recommend their fresh tuna!"
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CategorySelectorPage;
