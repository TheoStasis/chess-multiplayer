import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChessProvider } from "./context/ChessContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ChessProvider>
    <App />
  </ChessProvider>
);
