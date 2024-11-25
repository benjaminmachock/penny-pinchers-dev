import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import LoginPage from "./pages/loginPage.tsx";
import ProductPage from "./pages/productPage";
import ProductsPage from "./pages/productsPage";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ProductsPage />,
      },
      {
        path: "/product",
        element: <ProductPage />,
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
