import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initializeGoogleMeasurement } from "./analytics";
import "./styles.css";

initializeGoogleMeasurement();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
