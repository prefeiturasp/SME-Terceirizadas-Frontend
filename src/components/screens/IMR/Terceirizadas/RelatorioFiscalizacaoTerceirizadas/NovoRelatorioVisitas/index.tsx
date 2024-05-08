import React from "react";
import { Cabecalho } from "./components/Cabecalho";
import "./styles.scss";

export const NovoRelatorioVisitas = () => {
  return (
    <div className="card novo-relatorio-visitas mt-3">
      <div className="card-body">
        <Cabecalho />
      </div>
    </div>
  );
};
