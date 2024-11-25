import ProductComponent from "../components/product/productCard";
import type { Product as ProductType } from "../interfaces/products";

const mockProduct: ProductType = {
  id: 1,
  title: "Smoked Salmon",
  price: 25.99,
  description: "Premium smoked salmon, perfect for special occasions.",
  category: "smoked",
  image: "/images/smoked-salmon.jpg",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const ProductPage = () => {
  return (
    <div>
      <ProductComponent product={mockProduct} />
    </div>
  );
};

export default ProductPage;
