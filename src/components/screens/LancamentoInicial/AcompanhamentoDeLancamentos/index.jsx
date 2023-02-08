import React from "react";
import { CardMedicaoPorStatus } from "./components/CardMedicaoPorStatus";
import "./style.scss";

export const AcompanhamentoDeLancamentos = () => {
  return (
    <div className="acompanhamento-de-lancamentos">
      <div className="card mt-3">
        <div className="card-body">
          <CardMedicaoPorStatus total="25" classeCor="azul-claro">
            Recebidos <br /> para análise
          </CardMedicaoPorStatus>
        </div>
      </div>
    </div>
  );
};
