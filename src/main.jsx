
import "./index.css";

// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import { SearchProvider } from "./context/SearchContext";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
 <SearchProvider>

 
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
    </SearchProvider>

  </React.StrictMode>
);