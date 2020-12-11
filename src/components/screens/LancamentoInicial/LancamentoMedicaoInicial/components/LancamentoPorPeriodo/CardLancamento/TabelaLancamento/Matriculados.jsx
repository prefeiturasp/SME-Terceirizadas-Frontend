import React from "react";

export default ({ dadosMatriculados }) => {
  const mostrarDieta =
    dadosMatriculados.tipoA > 0 || dadosMatriculados.tipoB > 0;
  return (
    <div
      className={`tabela-lancamento tabela-frequencia-por-dia ${
        mostrarDieta ? "com-dieta" : ""
      }`}
    >
      <div className="col report-label-value">
        <p className="value">Qtd. de Matriculados para o Dia</p>
      </div>
      <div className="cabecalho-tabela">
        <div>
          <span>Alimento Convencional</span>
        </div>
        {mostrarDieta && (
          <>
            <div>
              <span>Dieta Tipo A</span>
            </div>
            <div>
              <span>Dieta Tipo B</span>
            </div>
          </>
        )}
      </div>
      <div className="linha-tabela">
        <div>{dadosMatriculados.convencional}</div>
        {mostrarDieta && (
          <>
            <div>{dadosMatriculados.tipoA}</div>
            <div>{dadosMatriculados.tipoB}</div>
          </>
        )}
      </div>
    </div>
  );
};
