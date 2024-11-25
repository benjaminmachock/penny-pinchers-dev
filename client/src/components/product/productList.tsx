// import React from "react";
// import { Card, Button, Container, Row, Col } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import type { Product } from "../../interfaces/products";

// interface ProductListProps {
//   allProducts: Product[];
// }

// const styles = {
//   img: { height: 300, objectFit: "cover", borderRadius: "8px" },
//   card: {
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     border: "none",
//     transition: "transform 0.3s, box-shadow 0.3s",
//   },
//   cardHover: {
//     transform: "scale(1.05)",
//     boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
//   },
//   button: {
//     borderRadius: "20px",
//     padding: "10px 20px",
//     fontWeight: "bold",
//   },
// };

// const ProductList: React.FC<ProductListProps> = ({ allProducts }) => {
//   const navigate = useNavigate();

//   return (
//     <Container className="my-5">
//       <Row xs={1} md={3} className="g-4 justify-content-center">
//         {allProducts.map((product) => (
//           <Col key={product.id}>
//             <Card
//               className="h-100"
//               style={styles.card as React.CSSProperties}
//               onMouseEnter={(e) =>
//                 ((
//                   e.currentTarget as HTMLElement
//                 ).style.cssText = `transform: ${styles.cardHover.transform}; box-shadow: ${styles.cardHover.boxShadow};`)
//               }
//               onMouseLeave={(e) =>
//                 ((
//                   e.currentTarget as HTMLElement
//                 ).style.cssText = `box-shadow: ${styles.card.boxShadow}; transform: none;`)
//               }
//             >
//               <Card.Img
//                 variant="top"
//                 src={product.image || "/placeholder.png"}
//                 alt={product.title}
//                 style={styles.img as React.CSSProperties}
//               />
//               <Card.Body>
//                 <Card.Title className="text-truncate">
//                   {product.title}
//                 </Card.Title>
//                 <Card.Text className="text-muted">
//                   {product.description && product.description.length > 60
//                     ? `${product.description.substring(0, 60)}...`
//                     : product.description || ""}
//                 </Card.Text>
//                 <Card.Text>
//                   <strong>Category:</strong> {product.category || "N/A"}
//                 </Card.Text>
//                 <Button
//                   variant="primary"
//                   style={styles.button as React.CSSProperties}
//                   onClick={() => {
//                     navigate(`/product/${product.id}`); // Navigate to the product detail page
//                   }}
//                 >
//                   View Details
//                 </Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default ProductList;

import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface ProductListProps {
  allProducts: Array<{
    _id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    price?: number;
  }>;
  setSelectedCategory?: React.Dispatch<React.SetStateAction<string | null>>;
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

const ProductList: React.FC<ProductListProps> = ({
  allProducts,
  setSelectedCategory,
}) => {
  const navigate = useNavigate();

  return (
    <Container className="my-5">
      {setSelectedCategory && (
        <div className="text-center mb-4">
          <Button
            variant="secondary"
            onClick={() => setSelectedCategory("all")}
            className="me-2"
          >
            All
          </Button>
          <Button
            variant="secondary"
            onClick={() => setSelectedCategory("smoked")}
            className="me-2"
          >
            Smoked
          </Button>
          <Button
            variant="secondary"
            onClick={() => setSelectedCategory("fresh")}
          >
            Fresh
          </Button>
        </div>
      )}

      <Row xs={1} md={3} className="g-4">
        {allProducts.map((product) => (
          <Col key={product._id}>
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
                src={product.image}
                alt={product.title}
                style={styles.img as React.CSSProperties}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  {product.description.length > 60
                    ? `${product.description.substring(0, 60)}...`
                    : product.description}
                </Card.Text>
                <Button
                  variant="primary"
                  style={styles.button as React.CSSProperties}
                  onClick={() => navigate(`/product/${product._id}`)}
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
