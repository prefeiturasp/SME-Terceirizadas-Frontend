import { GlobalContext } from "context";
import React from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Routes from "./routes";
import { cesInterceptFetch } from "./services/ces.service.js";

cesInterceptFetch();

export const App = () => {
  return (
    <GlobalContext>
      <ToastContainer />
      <Routes />
    </GlobalContext>
  );
};
