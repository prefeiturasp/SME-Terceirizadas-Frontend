import React from "react";

export const RowTableSchool = props => {
  const { escola, solicitation } = props;

  return (
    <div className="tabela-escolas">
      <div>094633</div>
      <div>{escola.nome}</div>
      <div>{escola.numero_alunos} alunos</div>
      <div>{solicitation.formulario.tempo_passeio_formulario}</div>
      <div>{solicitation.formulario.opcao_desejada}</div>
      <div>
        {escola.numero_alunos * solicitation.formulario.kits_lanche.length} Kits
      </div>
    </div>
  );
};
