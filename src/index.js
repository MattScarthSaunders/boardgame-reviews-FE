import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { VisualModeProvider } from "./components/_context/VisualModeContext";
import { UserProvider } from "./components/_context/UserContext";
import { CategoryProvider } from "./components/_context/CategoryContext";
import { ReviewsProvider } from "./components/_context/ReviewsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <VisualModeProvider>
      <UserProvider>
        <CategoryProvider>
          <ReviewsProvider>
            <App />
          </ReviewsProvider>
        </CategoryProvider>
      </UserProvider>
    </VisualModeProvider>
  </BrowserRouter>
);
