import { useState } from "react";
import { Container } from "react-bootstrap";
import type { Product } from "../interfaces/products";
import ProductList from "../components/product/productList";

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Smoked Salmon",
    description: "Premium smoked salmon, perfect for special occasions.",
    category: "smoked",
    image: "/images/smoked-salmon.jpg",
    price: 25.99,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "Fresh Tuna",
    description: "Freshly caught tuna, ideal for sashimi or grilling.",
    category: "fresh",
    image: "/images/fresh-tuna.jpg",
    price: 15.99,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: "Smoked Gouda",
    description: "Rich and creamy smoked Gouda cheese.",
    category: "smoked",
    image: "/images/smoked-gouda.jpg",
    price: 12.99,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    title: "Fresh Apples",
    description: "Crisp and juicy apples, straight from the orchard.",
    category: "fresh",
    image: "/images/fresh-apples.jpg",
    price: 3.99,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    title: "Smoked Almonds",
    description: "Savory smoked almonds, a perfect snack.",
    category: "smoked",
    image: "/images/smoked-almonds.jpg",
    price: 8.99,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    title: "Fresh Bread",
    description: "Warm and crusty bread, baked daily.",
    category: "fresh",
    image: "/images/fresh-bread.jpg",
    price: 4.99,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    title: "Smoked Bacon",
    description: "Thick-cut smoked bacon, perfect for breakfast.",
    category: "smoked",
    image: "/images/smoked-bacon.jpg",
    price: 9.99,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 8,
    title: "Fresh Eggs",
    description: "Farm-fresh eggs, great for baking or breakfast.",
    category: "fresh",
    image: "/images/fresh-eggs.jpg",
    price: 2.99,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const ProductsPage: React.FC = () => {
  const [allProducts] = useState<Product[]>(mockProducts);

  return (
    <Container className="py-5">
      <ProductList allProducts={allProducts} />
    </Container>
  );
};

export default ProductsPage;
