import Product from "../components/product/productCard";
import type { Product as ProductType } from "../interfaces/products";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PRODUCT } from "../utils/queries";
import { Container, Spinner, Alert } from "react-bootstrap";
import React from "react";

const ProductCardPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  console.log("Product ID:", productId);

  const { loading, error, data } = useQuery(QUERY_SINGLE_PRODUCT, {
    variables: { productId },
  });

  if (!productId) {
    return (
      <Container className="text-center py-5">
        <Alert variant="warning">Invalid product ID.</Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center py-5">
        <Alert variant="danger">Failed to load product: {error.message}</Alert>
      </Container>
    );
  }

  console.log("GraphQL Data:", data);

  const product: ProductType | undefined = data?.product;

  if (!product) {
    return (
      <Container className="text-center py-5">
        <Alert variant="info">Product not found.</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Product product={product} />
    </Container>
  );
};

export default ProductCardPage;

// import { useQuery } from "@apollo/client";
// import { useParams } from "react-router-dom";
// import { QUERY_SINGLE_PRODUCT } from "../utils/queries";
// import Product from "../components/product/productCard";
// import type { Product as ProductType } from "../interfaces/products";
// import { Container, Spinner, Alert } from "react-bootstrap";

// const ProductCardPage: React.FC = () => {
//   const { productId } = useParams<{ productId: string }>();

//   console.log("Product ID:", productId);

//   const { loading, error, data } = useQuery(QUERY_SINGLE_PRODUCT, {
//     variables: { productId },
//   });

//   if (!productId) {
//     return (
//       <Container className="text-center py-5">
//         <Alert variant="warning">Invalid product ID.</Alert>
//       </Container>
//     );
//   }

//   if (loading) {
//     return (
//       <Container className="text-center py-5">
//         <Spinner animation="border" />
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="text-center py-5">
//         <Alert variant="danger">Failed to load product: {error.message}</Alert>
//       </Container>
//     );
//   }

//   console.log("GraphQL Data:", data);
//   const product: ProductType | undefined = data?.product;

//   if (!product) {
//     return (
//       <Container className="text-center py-5">
//         <Alert variant="info">Product not found.</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="py-5">
//       <Product product={product} />
//     </Container>
//   );
// };

// export default ProductCardPage;
