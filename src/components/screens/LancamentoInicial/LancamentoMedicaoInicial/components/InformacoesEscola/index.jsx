import React from "react";

export default ({ meusDados }) => {
  const escola = meusDados.vinculo_atual && meusDados.vinculo_atual.instituicao;

  return (
    <div>
      <div className="row">
        <div className="col report-label-value">
          <p className="value">Informações da escola</p>
        </div>
      </div>
      <div className="row">
        <div className="col-2 report-label-value">
          <p>Código EOL</p>
          <p className="value-important">{escola && escola.codigo_eol}</p>
        </div>
        <div className="col-6 report-label-value">
          <p>Nome</p>
          <p className="value-important">{escola && escola.nome}</p>
        </div>
        <div className="col-4 report-label-value">
          <p>DRE</p>
          <p className="value-important">
            {escola && escola.diretoria_regional.nome}
          </p>
        </div>
      </div>
    </div>
  );
};
