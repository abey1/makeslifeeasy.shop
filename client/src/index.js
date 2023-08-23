import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { UserContextProvider } from "./contexts/UserContext";
import { GlobalAppContextProvider } from "./contexts/GlobalAppContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalAppContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </GlobalAppContextProvider>
  </React.StrictMode>
);
