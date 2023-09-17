import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

import SalePage from "./components/SalePage";
import Header from "./components/header/Header";
import GalleryPage from "./components/GalleryPage";
import ContactPage from "./components/ContactPage";
import Indoor from "./components/collections/Indoor";
import NewMeetupPage from "./components/New-Products/NewProducts";
import CartProvider from "./store/CartProvider";
import CollectionPage from "./components/collections/CollectionPage";
import Admin from "./components/admin/Admin";
// import Outdoor from "./components/collections/Outdoor";
// import Office from "./components/collections/Office";
// import Test from "./components/Test";

import { Provider } from 'react-redux';
import store from "./components/Auth-Modal/store";

import Footer from "./components/Footer";
import AdminPanel from "./components/admin/AdminPanel";
import AllProductsPage from "./components/admin/AllPdoructsPage";
import AddNewProducts from "./components/admin/AddNewProducts";
import ProductsDetail from "./components/admin/ProductsDetail";
import { checkAuthLoader } from "./components/admin/AdminAuth";

const router = createBrowserRouter([
  { path: '/admin', element: <Admin /> },
  { path: 'admin-panel', element: <AdminPanel />, loader: checkAuthLoader },
  { path: 'all-products', element: <AllProductsPage />, loader: checkAuthLoader },
  { path: 'products-detail', element: <ProductsDetail />, loader: checkAuthLoader },
  { path: 'add-new-products', element: <AddNewProducts />, loader: checkAuthLoader },
  {
    path: "/",
    element: <Header />,
    children: [
      { path: "/", element: <App /> },
      { path: "add-products", element: <NewMeetupPage /> },
      { path: "sale", element: <SalePage /> },
      { path: "gallery", element: <GalleryPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "indoor", element: <Indoor /> },
      { path: 'product', element: <CollectionPage /> },

      // { path: "outdoor", element: <Outdoor /> }, 
      // { path: "office", element: <Office /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

const shouldDisplayFooter = window.location.pathname !== '/admin' && window.location.pathname !== '/admin-panel' && window.location.pathname !== '/all-products' && window.location.pathname !== '/products-detail';

root.render(
  <CartProvider>
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
        {shouldDisplayFooter && <Footer />}
      </Provider>
    </React.StrictMode>
  </CartProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();