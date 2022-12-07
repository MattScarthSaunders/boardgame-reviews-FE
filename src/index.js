import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { VisualModeProvider } from "./components/context/VisualModeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <VisualModeProvider>
      <App />
    </VisualModeProvider>
  </BrowserRouter>
);
