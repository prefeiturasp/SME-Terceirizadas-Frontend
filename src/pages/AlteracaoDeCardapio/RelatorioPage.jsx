import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Relatorio from "../../components/AlteracaoDeCardapio/Relatorio";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "../../constants/config.constants";
import {
  ALTERACAO_CARDAPIO,
  ESCOLA
} from "../../configs/constants";

import { escolaCancelaAlteracaoCardapio } from "../../services/alteracaoDecardapio.service";
import { ModalCancelarSolicitacao } from "../../components/Shareable/ModalCancelarSolicitacao";

class RelatorioBase extends React.Component {
  render() {
    const atual = {
      href: "#",
      titulo: "Relatório"
    };
    const anteriores = [
      {
        href: `/${this.props.VISAO}/${ALTERACAO_CARDAPIO}`,
        titulo: "Alterações de Cardápio"
      }
    ];

    return (
      <Page>
        <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
        <Relatorio {...this.props} />
      </Page>
    );
  }
}

// Escola
export const RelatorioEscola = () => (
  <RelatorioBase
    VISAO={ESCOLA}
    modalNaoAprova={ModalCancelarSolicitacao}
    toastNaoAprovaMensagem={"Alteração de Cardápio cancelada com sucesso!"}
    naoAprovaSolicitacaoEndpoint={escolaCancelaAlteracaoCardapio}
  />
);
