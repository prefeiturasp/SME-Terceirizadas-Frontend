import React from "react";
import { stringSeparadaPorVirgulas } from "../../helpers/utilities";

export const RowTableSchool = props => {
  const { escola_quantidade, solicitation } = props;
  console.log(solicitation.solicitacao_kit_lanche.kits !== []);

  return (
    <div className="tabela-escolas">
      <div>{escola_quantidade.escola.codigo_eol}</div>
      <div>{escola_quantidade.escola.nome}</div>
      <div>{escola_quantidade.quantidade_alunos} alunos</div>
      <div>
        {solicitation.solicitacao_kit_lanche.tempo_passeio_explicacao ||
          escola_quantidade.tempo_passeio_explicacao}
      </div>
      <div>
        {stringSeparadaPorVirgulas(
          solicitation.solicitacao_kit_lanche.kits.length > 0
            ? solicitation.solicitacao_kit_lanche.kits
            : escola_quantidade.kits,
          "nome"
        )}
      </div>
      <div>
        {escola_quantidade.quantidade_alunos *
          (solicitation.solicitacao_kit_lanche.kits.length > 0
          ? solicitation.solicitacao_kit_lanche.kits.length
          : escola_quantidade.kits.length)}{" "}
        Kits
      </div>
    </div>
  );
};
