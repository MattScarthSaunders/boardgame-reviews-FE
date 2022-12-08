import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { VisualModeProvider } from "./components/context/VisualModeContext";
import { UserProvider } from "./components/context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <VisualModeProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </VisualModeProvider>
  </BrowserRouter>
);
