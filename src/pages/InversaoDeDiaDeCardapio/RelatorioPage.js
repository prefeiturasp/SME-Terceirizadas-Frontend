import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Relatorio from "../../components/InversaoDeDiaDeCardapio/Relatorio";
import Container from "../../components/InversaoDeDiaDeCardapio/Container";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "../../constants/config.constants";
import {
  INVERSAO_CARDAPIO,
  ESCOLA,
  DRE,
  CODAE,
  TERCEIRIZADA
} from "../../configs/constants";

import {
  CODAEAutorizaPedidoDRE,
  dreValidaPedidoEscola,
  terceirizadaTomaCiencia,
  DRENegaInversaoDeDiaDeCardapio,
  CODAEQuestionaInversaoDeDiaDeCardapio,
  TerceirizadaRespondeQuestionamentoInversaoDeDiaDeCardapio
} from "../../services/inversaoDeDiaDeCardapio.service";
import { ModalNegarSolicitacao } from "../../components/Shareable/ModalNegarSolicitacao";
import { ModalNaoValidarSolicitacao } from "../../components/Shareable/ModalNaoValidarSolicitacao";
import { ModalTerceirizadaRespondeQuestionamento } from "../../components/Shareable/ModalTerceirizadaRespondeQuestionamento";
import { ModalCODAEQuestiona } from "../../components/Shareable/ModalCODAEQuestiona";

class RelatorioBase extends React.Component {
  render() {
    const atual = {
      href: "#",
      titulo: "Relatório"
    };
    const anteriores = [
      {
        href: `/${this.props.VISAO}/${INVERSAO_CARDAPIO}`,
        titulo: "Solicitações de Inversao de Dia do Cardapio"
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

export class InversaoDeDiaDeCardapioPage extends React.Component {
  render() {
    const atual = {
      href: "/escola/inversao-de-dia-de-cardapio",
      titulo: "Inversão de dia de Cardápio"
    };
    return (
      <Page titulo={atual.titulo}>
        <Breadcrumb home={HOME} atual={atual} />
        <Container />
      </Page>
    );
  }
}

// Escola
export const RelatorioEscola = () => <RelatorioBase VISAO={ESCOLA} />;
// DRE
export const RelatorioDRE = () => (
  <RelatorioBase
    VISAO={DRE}
    endpointAprovaSolicitacao={dreValidaPedidoEscola}
    endpointNaoAprovaSolicitacao={DRENegaInversaoDeDiaDeCardapio}
    ModalNaoAprova={ModalNaoValidarSolicitacao}
    toastAprovaMensagem={"Inversão de Cardápio validada com sucesso!"}
    toastAprovaMensagemErro={"Houve um erro ao validar a Inversão de Cardápio"}
    textoBotaoNaoAprova="Não Validar"
    textoBotaoAprova="Validar"
  />
);

export const RelatorioCODAE = () => (
  <RelatorioBase
    VISAO={CODAE}
    ModalNaoAprova={ModalNegarSolicitacao}
    HandleAprovaPedido={CODAEAutorizaPedidoDRE}
    ModalQuestionamento={ModalCODAEQuestiona}
    toastAprovaMensagem={"Inversão de Cardápio autorizada com sucesso!"}
    toastAprovaMensagemErro={
      "Houve um erro ao autorizar a Inversão de Cardápio"
    }
    textoBotaoNaoAprova="Negar"
    textoBotaoAprova="Autorizar"
    endpointAprovaSolicitacao={CODAEAutorizaPedidoDRE}
    endpointQuestionamento={CODAEQuestionaInversaoDeDiaDeCardapio}
  />
);
// TERCEIRIZADA
export const RelatorioTerceirizada = () => (
  <RelatorioBase
    VISAO={TERCEIRIZADA}
    ModalNaoAprova={ModalTerceirizadaRespondeQuestionamento}
    ModalQuestionamento={ModalTerceirizadaRespondeQuestionamento}
    endpointQuestionamento={
      TerceirizadaRespondeQuestionamentoInversaoDeDiaDeCardapio
    }
    toastAprovaMensagem={
      "Ciência de Alteração de Cardápio enviado com sucesso!"
    }
    toastAprovaMensagemErro={
      "Houve um erro ao tomar ciência da Alteração de Cardápio"
    }
    textoBotaoNaoAprova="Não"
    textoBotaoAprova="Ciente"
    endpointAprovaSolicitacao={terceirizadaTomaCiencia}
  />
);
// endpointAprovaSolicitacao={terceirizadaTomaCiencia}
// endpointReprovaSolicitacao={
//   terceirizadaRespondeQuestionamentoAlteracaoCardapio
// }
// endpointQuestionamento={terceirizadaRespondeQuestionamentoAlteracaoCardapio}
