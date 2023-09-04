import React from "react";
import { GlobalContext } from "context";
import "./App.css";
import Routes from "./routes";

export const App = () => {
  return (
    <GlobalContext>
      <Routes />
    </GlobalContext>
  );
};
