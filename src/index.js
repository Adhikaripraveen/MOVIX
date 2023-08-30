import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import WatchListProvider from "./WatchListProvider";
import "./index.css";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WatchListProvider>
        <App />
      </WatchListProvider>
    </BrowserRouter>
  </React.StrictMode>
);
