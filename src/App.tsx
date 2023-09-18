import React from "react";
import { GlobalContext } from "context";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Routes from "./routes";

export const App = () => {
  return (
    <GlobalContext>
      <ToastContainer />
      <Routes />
    </GlobalContext>
  );
};
