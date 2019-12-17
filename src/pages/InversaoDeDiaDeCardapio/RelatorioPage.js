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
  DRENegaInversaoDeDiaDeCardapio
} from "../../services/inversaoDeDiaDeCardapio.service";
import { ModalNegarSolicitacao } from "../../components/Shareable/ModalNegarSolicitacao";
import { ModalNaoValidarSolicitacao } from "../../components/Shareable/ModalNaoValidarSolicitacao";

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

// VISAO={DRE}
// ModalNaoAprova={ModalNaoValidarSolicitacao}
// toastAprovaMensagem={"Alteração de Cardápio validada com sucesso!"}
// toastAprovaMensagemErro={"Houve um erro ao validar a Alteração de Cardápio"}
// endpointNaoAprovaSolicitacao={DRENaoValidaAlteracaoCardapio}
// endpointAprovaSolicitacao={DREValidaAlteracaoCardapio}
// textoBotaoNaoAprova="Não Validar"
// textoBotaoAprova="Validar"
// CODAE
export const RelatorioCODAE = () => (
  <RelatorioBase
    VISAO={CODAE}
    ModalNaoAprova={ModalNegarSolicitacao}
    HandleAprovaPedido={CODAEAutorizaPedidoDRE}
    toastAprovaMensagem={"Inversão de Cardápio autorizada com sucesso!"}
    toastAprovaMensagemErro={
      "Houve um erro ao autorizar a Inversão de Cardápio"
    }
    textoBotaoNaoAprova="Negar"
    textoBotaoAprova="Autorizar"
    // endpointNaoAprovaSolicitacao={CODAENegaAlteracaoCardapio}
    endpointAprovaSolicitacao={CODAEAutorizaPedidoDRE}
    // endpointQuestionamento={CODAEquestionaAlteracaoCardapio}
  />
);
// TERCEIRIZADA
export const RelatorioTerceirizada = () => (
  <RelatorioBase
    VISAO={TERCEIRIZADA}
    HandleAprovaPedido={terceirizadaTomaCiencia}
    toastSucessoMensagem={
      "Ciência de Inversão de dias de cardápio enviada com sucesso!"
    }
    textoBotaoNaoAprova="Não"
    textoBotaoAprova="Ciente"
  />
);
