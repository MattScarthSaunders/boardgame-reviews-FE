import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ReviewsProvider } from "./components/contexts/ReviewContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ReviewsProvider>
      <App />
    </ReviewsProvider>
  </BrowserRouter>
);
