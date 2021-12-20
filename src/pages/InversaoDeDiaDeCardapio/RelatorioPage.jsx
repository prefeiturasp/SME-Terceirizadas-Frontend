import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Relatorio from "../../components/InversaoDeDiaDeCardapio/Relatorio";
import Container from "../../components/InversaoDeDiaDeCardapio/Container";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "../../constants/config";
import { ESCOLA, DRE, CODAE, TERCEIRIZADA } from "../../configs/constants";

import {
  CODAEAutorizaPedidoDRE,
  dreValidaPedidoEscola,
  terceirizadaTomaCiencia,
  DRENegaInversaoDeDiaDeCardapio,
  CODAEQuestionaInversaoDeDiaDeCardapio,
  TerceirizadaRespondeQuestionamentoInversaoDeDiaDeCardapio,
  CODAENegaInversaoDeDiaDeCardapio,
  escolaCancelaInversaoDiaCardapio
} from "../../services/inversaoDeDiaDeCardapio.service";
import { ModalNegarSolicitacao } from "../../components/Shareable/ModalNegarSolicitacao";
import { ModalNaoValidarSolicitacao } from "../../components/Shareable/ModalNaoValidarSolicitacao";
import { ModalTerceirizadaRespondeQuestionamento } from "../../components/Shareable/ModalTerceirizadaRespondeQuestionamento";
import { ModalCODAEQuestiona } from "../../components/Shareable/ModalCODAEQuestiona";
import { ModalCancelarSolicitacao } from "../../components/Shareable/ModalCancelarSolicitacao_";
import { ModalCODAEAutoriza } from "components/Shareable/ModalCODAEAutoriza";

class RelatorioBase extends React.Component {
  render() {
    const atual = {
      href: "#",
      titulo: "Relatório"
    };

    return (
      <Page>
        <Breadcrumb home={HOME} atual={atual} />
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
export const RelatorioEscola = () => (
  <RelatorioBase
    visao={ESCOLA}
    ModalNaoAprova={ModalCancelarSolicitacao}
    toastNaoAprovaMensagem={
      "Inversão de dia de Cardápio cancelada com sucesso!"
    }
    endpointNaoAprovaSolicitacao={escolaCancelaInversaoDiaCardapio}
    textoBotaoNaoAprova="Cancelar"
  />
);
// DRE
export const RelatorioDRE = () => (
  <RelatorioBase
    visao={DRE}
    endpointAprovaSolicitacao={dreValidaPedidoEscola}
    endpointNaoAprovaSolicitacao={DRENegaInversaoDeDiaDeCardapio}
    ModalNaoAprova={ModalNaoValidarSolicitacao}
    toastAprovaMensagem={"Inversão de dia de Cardápio validada com sucesso!"}
    toastAprovaMensagemErro={
      "Houve um erro ao validar a Inversão de dia de Cardápio"
    }
    textoBotaoNaoAprova="Não Validar"
    textoBotaoAprova="Validar"
  />
);

export const RelatorioCODAE = () => (
  <RelatorioBase
    visao={CODAE}
    ModalNaoAprova={ModalNegarSolicitacao}
    ModalCodaeAutoriza={ModalCODAEAutoriza}
    HandleAprovaPedido={CODAEAutorizaPedidoDRE}
    ModalQuestionamento={ModalCODAEQuestiona}
    toastAprovaMensagem={"Inversão de dia de Cardápio autorizada com sucesso!"}
    toastAprovaMensagemErro={
      "Houve um erro ao autorizar a Inversão de dia de Cardápio"
    }
    textoBotaoNaoAprova="Negar"
    textoBotaoAprova="Autorizar"
    endpointNaoAprovaSolicitacao={CODAENegaInversaoDeDiaDeCardapio}
    endpointAprovaSolicitacao={CODAEAutorizaPedidoDRE}
    endpointQuestionamento={CODAEQuestionaInversaoDeDiaDeCardapio}
  />
);
// TERCEIRIZADA
export const RelatorioTerceirizada = () => (
  <RelatorioBase
    visao={TERCEIRIZADA}
    ModalNaoAprova={ModalTerceirizadaRespondeQuestionamento}
    ModalQuestionamento={ModalTerceirizadaRespondeQuestionamento}
    endpointQuestionamento={
      TerceirizadaRespondeQuestionamentoInversaoDeDiaDeCardapio
    }
    toastAprovaMensagem={
      "Ciência de Inversão de dia de Cardápio enviado com sucesso!"
    }
    toastAprovaMensagemErro={
      "Houve um erro ao tomar ciência da Inversão de dia de Cardápio"
    }
    textoBotaoNaoAprova="Não"
    textoBotaoAprova="Ciente"
    endpointAprovaSolicitacao={terceirizadaTomaCiencia}
    endpointNaoAprovaSolicitacao={
      TerceirizadaRespondeQuestionamentoInversaoDeDiaDeCardapio
    }
  />
);
