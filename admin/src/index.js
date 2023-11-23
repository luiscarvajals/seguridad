import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals.js";
import { AuthContextoProvider } from "./Context/AuthContexto.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextoProvider>
      <App />
    </AuthContextoProvider>
  </React.StrictMode>
);

reportWebVitals();
