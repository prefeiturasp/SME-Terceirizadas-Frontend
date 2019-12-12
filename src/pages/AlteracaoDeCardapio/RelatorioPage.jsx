import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Relatorio from "../../components/AlteracaoDeCardapio/Relatorio";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "../../constants/config.constants";
import {
  ALTERACAO_CARDAPIO,
  ESCOLA,
  DRE,
  CODAE,
  TERCEIRIZADA
} from "../../configs/constants";
import {
  escolaCancelaAlteracaoCardapio,
  DRENaoValidaAlteracaoCardapio,
  DREValidaAlteracaoCardapio,
  CODAEAutorizaAlteracaoDeCardapio,
  CODAENegaAlteracaoCardapio,
  CODAEquestionaAlteracaoCardapio,
  TerceirizadaTomaCienciaAlteracaoCardapio,
  terceirizadaRespondeQuestionamentoAlteracaoCardapio
} from "../../services/alteracaoDecardapio.service";
import { ModalCancelarSolicitacao } from "../../components/Shareable/ModalCancelarSolicitacao_";
import { ModalNaoValidarSolicitacao } from "../../components/Shareable/ModalNaoValidarSolicitacao";
import { ModalNegarSolicitacao } from "../../components/Shareable/ModalNegarSolicitacao";
import { ModalCODAEQuestiona } from "../../components/Shareable/ModalCODAEQuestiona";
import { ModalTerceirizadaRespondeQuestionamento } from "../../components/Shareable/ModalTerceirizadaRespondeQuestionamento";

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
    ModalNaoAprova={ModalCancelarSolicitacao}
    toastNaoAprovaMensagem={"Alteração de Cardápio cancelada com sucesso!"}
    endpointNaoAprovaSolicitacao={escolaCancelaAlteracaoCardapio}
    textoBotaoNaoAprova="Cancelar"
  />
);

// DRE
export const RelatorioDRE = () => (
  <RelatorioBase
    VISAO={DRE}
    ModalNaoAprova={ModalNaoValidarSolicitacao}
    toastAprovaMensagem={"Alteração de Cardápio validada com sucesso!"}
    toastAprovaMensagemErro={"Houve um erro ao validar a Alteração de Cardápio"}
    endpointNaoAprovaSolicitacao={DRENaoValidaAlteracaoCardapio}
    endpointAprovaSolicitacao={DREValidaAlteracaoCardapio}
    textoBotaoNaoAprova="Não Validar"
    textoBotaoAprova="Validar"
  />
);

// CODAE
export const RelatorioCODAE = () => (
  <RelatorioBase
    VISAO={CODAE}
    ModalNaoAprova={ModalNegarSolicitacao}
    ModalQuestionamento={ModalCODAEQuestiona}
    toastAprovaMensagem={"Alteração de Cardápio autorizada com sucesso!"}
    toastAprovaMensagemErro={
      "Houve um erro ao autorizar a Alteração de Cardápio"
    }
    endpointNaoAprovaSolicitacao={CODAENegaAlteracaoCardapio}
    endpointAprovaSolicitacao={CODAEAutorizaAlteracaoDeCardapio}
    endpointQuestionamento={CODAEquestionaAlteracaoCardapio}
    textoBotaoNaoAprova="Negar"
    textoBotaoAprova="Autorizar"
  />
);

// Terceirizada
export const RelatorioTerceirizada = () => (
  <RelatorioBase
    VISAO={TERCEIRIZADA}
    ModalNaoAprova={ModalTerceirizadaRespondeQuestionamento}
    ModalQuestionamento={ModalTerceirizadaRespondeQuestionamento}
    toastAprovaMensagem={
      "Ciência de Alteração de Cardápio enviado com sucesso!"
    }
    toastAprovaMensagemErro={
      "Houve um erro ao tomar ciência da Alteração de Cardápio"
    }
    endpointAprovaSolicitacao={TerceirizadaTomaCienciaAlteracaoCardapio}
    endpointReprovaSolicitacao={
      terceirizadaRespondeQuestionamentoAlteracaoCardapio
    }
    endpointQuestionamento={terceirizadaRespondeQuestionamentoAlteracaoCardapio}
    textoBotaoNaoAprova="Não"
    textoBotaoAprova="Ciente"
  />
);
