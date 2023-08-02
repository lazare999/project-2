import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SalePage from "./components/SalePage";
import Header from "./components/header/Header";
import GalleryPage from "./components/GalleryPage";
import ContactPage from "./components/ContactPage";
import Indoor from "./components/collections/Indoor";
import NewMeetupPage from "./components/New-Products/NewProducts";
// import Outdoor from "./components/collections/Outdoor";
// import Office from "./components/collections/Office";
import CartProvider from "./store/CartProvider";
import Footer from "./components/Footer";

import { Provider } from 'react-redux';
import store from "./components/Auth-Modal/store";

const router = createBrowserRouter([
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
      // { path: "outdoor", element: <Outdoor /> },
      // { path: "office", element: <Office /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartProvider>
    <React.StrictMode>
      <Provider store={store}>
      <RouterProvider router={router} />
      <Footer />
      </Provider>
    </React.StrictMode>
  </CartProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();











