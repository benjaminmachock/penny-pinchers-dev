import { useState, useEffect } from "react";
// import { retrieveProducts, filteredByCategory } from "../api/productsAPI";
import type { Product } from "..//interfaces/products";
import Products from "../components/product/productList";
import { Container, Form } from "react-bootstrap";

const ProductPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]); // Previously: products
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Previously: filteredData
  const [isCategorySelected, setIsCategorySelected] = useState(false); // Previously: userSelected

  const handleCategoryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategory = e.target.value; // Previously: value
    const productsByCategory = await filteredByCategory(selectedCategory); // Previously: data
    setFilteredProducts(productsByCategory);
    setIsCategorySelected(true); // Switch to filtered view
  };

  useEffect(() => {
    loadAllProducts(); // Previously: fetchProducts
  }, []);

  const loadAllProducts = async () => {
    const productsFromAPI = await retrieveProducts(); // Previously: userProducts
    setAllProducts(productsFromAPI);
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Our Products</h1>
      <Form.Group controlId="categorySelect" className="mb-4">
        <Form.Label>Filter by Category:</Form.Label>
        <Form.Select onChange={handleCategoryChange}>
          <option value="">All Products</option>
          <option value="smoked">Smoked</option>
          <option value="fresh">Fresh</option>
        </Form.Select>
      </Form.Group>
      <Products
        allProducts={allProducts} // Updated prop name
        filteredProducts={filteredProducts} // Updated prop name
        isCategorySelected={isCategorySelected} // Updated prop name
        setIsCategorySelected={setIsCategorySelected} // Updated prop name
      />
    </Container>
  );
};

export default ProductPage;
