// import React from "react";
// import ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// import App from "./App.tsx";
// import LoginPage from "./pages/loginPage.tsx";
// import ProductsPage from "./pages/productsPage";
// import ProductCardPage from "./pages/productCardPage.tsx";
// import "bootstrap/dist/css/bootstrap.min.css";

// const client = new ApolloClient({
//   uri: "http://localhost:3001/graphql",
//   cache: new InMemoryCache(),
// });

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         index: true,
//         element: <ProductsPage />,
//       },
//       {
//         path: "/product/:productId",
//         element: <ProductCardPage />,
//       },
//       {
//         path: "/login",
//         element: <LoginPage />,
//       },
//     ],
//   },
// ]);

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );

// root.render(
//   <React.StrictMode>
//     <ApolloProvider client={client}>
//       <RouterProvider router={router} />
//     </ApolloProvider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/loginPage";
import ProductsPage from "./pages/productsPage";
import ProductCardPage from "./pages/productCardPage";
import CartPage from "./pages/cartPage";
import CheckoutPage from "./pages/checkouPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "./components/cart/cartContext";

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
        path: "/product/:productId",
        element: <ProductCardPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);
