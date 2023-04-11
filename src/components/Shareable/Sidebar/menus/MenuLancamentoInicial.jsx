import React from "react";
import { Menu, LeafItem } from "./shared";
import {
  ACOMPANHAMENTO_DE_LANCAMENTOS,
  LANCAMENTO_INICIAL,
  LANCAMENTO_MEDICAO_INICIAL,
  MEDICAO_INICIAL
} from "configs/constants";
import {
  exibirModuloMedicaoInicial,
  usuarioEhEscolaTerceirizadaDiretor,
  usuarioEhDRE,
  usuarioEhEscolaTerceirizada,
  usuarioEhMedicao
} from "helpers/utilities";

export default () => {
  return (
    exibirModuloMedicaoInicial() && (
      <Menu
        id="LancamentoInicial"
        icon="fas fa-pencil-alt"
        title={"Medição Inicial"}
      >
        {(usuarioEhEscolaTerceirizada() ||
          usuarioEhEscolaTerceirizadaDiretor()) && (
          <LeafItem to={`/${LANCAMENTO_INICIAL}/${LANCAMENTO_MEDICAO_INICIAL}`}>
            Lançamento Medição Inicial
          </LeafItem>
        )}
        {(usuarioEhDRE() ||
          usuarioEhMedicao() ||
          usuarioEhEscolaTerceirizadaDiretor()) && (
          <LeafItem to={`/${MEDICAO_INICIAL}/${ACOMPANHAMENTO_DE_LANCAMENTOS}`}>
            Acompanhamento de Lançamentos
          </LeafItem>
        )}
      </Menu>
    )
  );
};
