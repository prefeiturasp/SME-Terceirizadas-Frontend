import React from "react";
import { Menu, LeafItem } from "./shared";
import {
  LANCAMENTO_INICIAL,
  LANCAMENTO_MEDICAO_INICIAL
} from "configs/constants";
import { usuarioEhEscola } from "helpers/utilities";

export default () => {
  const exibirLancamentoMedicaoInicial = usuarioEhEscola();

  return (
    <Menu
      id="LancamentoInicial"
      icon="fas fa-pencil-alt"
      title={"Lançamento Inicial"}
    >
      {exibirLancamentoMedicaoInicial && (
        <LeafItem to={`/${LANCAMENTO_INICIAL}/${LANCAMENTO_MEDICAO_INICIAL}`}>
          Lançamento Medição Inicial
        </LeafItem>
      )}
    </Menu>
  );
};
