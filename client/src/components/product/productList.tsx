import { Card, Button, Container, Row, Col } from "react-bootstrap";
import type { Product } from "../../interfaces/products";
import { Link } from "react-router-dom";

interface Products {
  allProducts: Product[]; // Previously: products
  filteredProducts: Product[]; // Previously: filteredData
  isCategorySelected: boolean; // Previously: userSelected
  setIsCategorySelected: React.Dispatch<React.SetStateAction<boolean>>; // Previously: setUserSelected
}

const styles = {
  img: { height: "200px", objectFit: "cover" } as React.CSSProperties,
};

const Products: React.FC<Products> = ({
  allProducts,
  filteredProducts,
  isCategorySelected,
  setIsCategorySelected,
}) => {
  const productsToDisplay = isCategorySelected ? filteredProducts : allProducts; // Previously: displayedProducts

  return (
    <Container>
      <Button
        onClick={() => {
          setIsCategorySelected(false);
        }}
        variant="primary"
        className="mb-4"
      >
        Show All Products
      </Button>
      <Row xs={1} md={3} className="g-4">
        {productsToDisplay.map(
          (
            product // Previously: displayedProducts
          ) => (
            <Col key={product.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={product.image || "/placeholder.png"}
                  alt={product.title}
                  style={styles.img}
                />
                <Card.Body>
                  <Card.Title className="text-truncate">
                    {product.title}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    {Products.description.substring(0, 100)}...
                  </Card.Text>
                  <Link to={`/product/${product.id}`}>
                    <Button variant="outline-primary" size="sm">
                      View Details
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          )
        )}
      </Row>
    </Container>
  );
};

export default Products;
