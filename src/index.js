import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; //ibrary to talk to web browsers
import "./styles.css";

import App from "./App"; // component created in App.js

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);