import React from "react";
import { Menu, LeafItem } from "./shared";
import {
  LANCAMENTO_INICIAL,
  LANCAMENTO_MEDICAO_INICIAL
} from "configs/constants";
import { exibirLancamentoMedicaoInicial } from "helpers/utilities";

export default () => {
  return (
    exibirLancamentoMedicaoInicial() && (
      <Menu
        id="LancamentoInicial"
        icon="fas fa-pencil-alt"
        title={"Medição Inicial"}
      >
        <LeafItem to={`/${LANCAMENTO_INICIAL}/${LANCAMENTO_MEDICAO_INICIAL}`}>
          Lançamento Medição Inicial
        </LeafItem>
      </Menu>
    )
  );
};
