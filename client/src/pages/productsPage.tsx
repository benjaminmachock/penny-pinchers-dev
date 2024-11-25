import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";
import CategorySelector from "..//components/product/categorySelector";
import ProductList from "../components/product/productList";
import { Container, Spinner, Alert } from "react-bootstrap";

const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { loading, error, data } = useQuery(QUERY_PRODUCTS);

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
        <Alert variant="danger">Failed to load products: {error.message}</Alert>
      </Container>
    );
  }

  const allProducts = data?.products || [];
  const filteredProducts =
    selectedCategory && selectedCategory !== "all"
      ? allProducts.filter(
          (product: any) => product.category === selectedCategory
        )
      : allProducts;

  return (
    <Container className="py-5">
      {!selectedCategory ? (
        <CategorySelector setSelectedCategory={setSelectedCategory} />
      ) : (
        <ProductList
          allProducts={filteredProducts}
          setSelectedCategory={setSelectedCategory}
        />
      )}
    </Container>
  );
};

export default ProductsPage;
