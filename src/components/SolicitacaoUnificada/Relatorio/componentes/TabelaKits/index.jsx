import React from "react";
import { stringSeparadaPorVirgulas } from "../../../../../helpers/utilities";

export const TabelaKits = props => {
  const { escola_quantidade, solicitacaoUnificada } = props;

  return (
    <div className="tabela-escolas">
      <div>{escola_quantidade.escola.codigo_eol}</div>
      <div>{escola_quantidade.escola.nome}</div>
      <div>{escola_quantidade.quantidade_alunos} alunos</div>
      <div>
        {solicitacaoUnificada.solicitacao_kit_lanche.tempo_passeio_explicacao ||
          escola_quantidade.tempo_passeio_explicacao}
      </div>
      <div>
        {stringSeparadaPorVirgulas(
          solicitacaoUnificada.solicitacao_kit_lanche.kits.length > 0
            ? solicitacaoUnificada.solicitacao_kit_lanche.kits
            : escola_quantidade.kits,
          "nome"
        )}
      </div>
      <div>
        {escola_quantidade.quantidade_alunos *
          (solicitacaoUnificada.solicitacao_kit_lanche.kits.length > 0
            ? solicitacaoUnificada.solicitacao_kit_lanche.kits.length
            : escola_quantidade.kits.length)}{" "}
        Kits
      </div>
    </div>
  );
};

export default TabelaKits;
