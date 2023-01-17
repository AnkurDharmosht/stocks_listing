import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/style.scss";
import App from "./App";
import { SideBarContextProvider } from "./store/sidebar-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SideBarContextProvider>
      <App />
    </SideBarContextProvider>
  </React.StrictMode>
);
