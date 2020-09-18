import React from "react";
import { Menu, LeafItem } from "./shared";
import { CONFIGURACOES, PERMISSOES, MENSAGEM, LANCAMENTO_INICIAL, LANCAMENTO_MEDICAO_INICIAL } from "configs/constants";
import {
  usuarioEhCODAEGestaoAlimentacao,
  usuarioEhCODAEDietaEspecial,
  usuarioEhEscola,
  usuarioEhTerceirizada,
  usuarioEhNutricionistaSupervisao,
  usuarioEhDRE
} from "helpers/utilities";

export default () => {
  const exibirLancamentoMedicaoInicial =
    usuarioEhEscola();

  return (
    <Menu id="Configuracoes" icon="fa-cog" title={"Lançamento Inicial"}>
      {exibirLancamentoMedicaoInicial && (
        <LeafItem to={`/${LANCAMENTO_INICIAL}/${LANCAMENTO_MEDICAO_INICIAL}`}>Lançamento Medição Inicial</LeafItem>
      )}
    </Menu>
  );
};
