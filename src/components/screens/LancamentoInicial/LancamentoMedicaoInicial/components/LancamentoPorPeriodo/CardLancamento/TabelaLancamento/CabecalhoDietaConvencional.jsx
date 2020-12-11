import React from "react";
import "./styles.scss";

export default ({ mostrarMatriculados }) => (
  <div className="cabecalho-tabela">
    <div>
      <span>Dia</span>
    </div>
    {mostrarMatriculados && (
      <div>
        <span>Matriculados</span>
      </div>
    )}
    <div>
      <span>
        Troca
        <br />
        (RPL/LPR)
      </span>
    </div>
    <div>
      <span>
        Merenda
        <br />
        seca
      </span>
    </div>
    <div>
      <span>Kit lanche</span>
    </div>
    <div>
      <span>
        Sobremesa
        <br />
        doce
      </span>
    </div>
  </div>
);
