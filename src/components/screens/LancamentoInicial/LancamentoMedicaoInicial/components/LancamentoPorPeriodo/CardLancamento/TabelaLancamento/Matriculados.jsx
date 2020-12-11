import React from "react";

export default ({ dadosMatriculados }) => {
  return (
    <div className="tabela-lancamento tabela-frequencia-por-dia">
      <div className="col report-label-value">
        <p className="value">Qtd. de Matriculados para o Dia</p>
      </div>
      <div className="cabecalho-tabela">
        <div>
          <span>Alimento Convencional</span>
        </div>
        <div>
          <span>Dieta Tipo A</span>
        </div>
        <div>
          <span>Dieta Tipo B</span>
        </div>
      </div>
      <div className="linha-tabela">
        <div>{dadosMatriculados.convencional}</div>
        <div>{dadosMatriculados.tipoA}</div>
        <div>{dadosMatriculados.tipoB}</div>
      </div>
    </div>
  );
};
