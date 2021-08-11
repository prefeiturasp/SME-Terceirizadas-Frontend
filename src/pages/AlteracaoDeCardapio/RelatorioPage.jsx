import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Relatorio from "../../components/AlteracaoDeCardapio/Relatorio";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "../../constants/config";
import { ESCOLA, DRE, CODAE, TERCEIRIZADA } from "../../configs/constants";
import {
  // escola
  escolaCancelarSolicitacaoDeAlteracaoDeCardapio,
  // DRE
  dreValidarSolicitacaoDeAlteracaoDeCardapio,
  dreReprovarSolicitacaoDeAlteracaoDeCardapio,
  // CODAE
  codaeAutorizarSolicitacaoDeAlteracaoDeCardapio,
  codaeNegarSolicitacaoDeAlteracaoDeCardapio,
  codaeQuestionarSolicitacaoDeAlteracaoDeCardapio,
  TerceirizadaTomaCienciaAlteracaoCardapio,
  terceirizadaRespondeQuestionamentoAlteracaoCardapio
} from "services/alteracaoDeCardapio";
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

    return (
      <Page>
        <Breadcrumb home={HOME} atual={atual} />
        <Relatorio {...this.props} />
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
      "Alteração do Tipo de Alimentação cancelada com sucesso!"
    }
    endpointNaoAprovaSolicitacao={
      escolaCancelarSolicitacaoDeAlteracaoDeCardapio
    }
    textoBotaoNaoAprova="Cancelar"
  />
);

// DRE
export const RelatorioDRE = () => (
  <RelatorioBase
    visao={DRE}
    ModalNaoAprova={ModalNaoValidarSolicitacao}
    toastAprovaMensagem={
      "Alteração do Tipo de Alimentação validada com sucesso!"
    }
    toastAprovaMensagemErro={
      "Houve um erro ao validar a Alteração do Tipo de Alimentação"
    }
    endpointNaoAprovaSolicitacao={dreReprovarSolicitacaoDeAlteracaoDeCardapio}
    endpointAprovaSolicitacao={dreValidarSolicitacaoDeAlteracaoDeCardapio}
    textoBotaoNaoAprova="Não Validar"
    textoBotaoAprova="Validar"
  />
);

// CODAE
export const RelatorioCODAE = () => (
  <RelatorioBase
    visao={CODAE}
    ModalNaoAprova={ModalNegarSolicitacao}
    ModalQuestionamento={ModalCODAEQuestiona}
    toastAprovaMensagem={
      "Alteração do Tipo de Alimentação autorizada com sucesso!"
    }
    toastAprovaMensagemErro={
      "Houve um erro ao autorizar a Alteração do Tipo de Alimentação"
    }
    endpointNaoAprovaSolicitacao={codaeNegarSolicitacaoDeAlteracaoDeCardapio}
    endpointAprovaSolicitacao={codaeAutorizarSolicitacaoDeAlteracaoDeCardapio}
    endpointQuestionamento={codaeQuestionarSolicitacaoDeAlteracaoDeCardapio}
    textoBotaoNaoAprova="Negar"
    textoBotaoAprova="Autorizar"
  />
);

// Terceirizada
export const RelatorioTerceirizada = () => (
  <RelatorioBase
    visao={TERCEIRIZADA}
    ModalNaoAprova={ModalTerceirizadaRespondeQuestionamento}
    ModalQuestionamento={ModalTerceirizadaRespondeQuestionamento}
    toastAprovaMensagem={
      "Ciência de Alteração do Tipo de Alimentação enviado com sucesso!"
    }
    toastAprovaMensagemErro={
      "Houve um erro ao tomar ciência da Alteração do Tipo de Alimentação"
    }
    endpointAprovaSolicitacao={TerceirizadaTomaCienciaAlteracaoCardapio}
    endpointNaoAprovaSolicitacao={
      terceirizadaRespondeQuestionamentoAlteracaoCardapio
    }
    endpointQuestionamento={terceirizadaRespondeQuestionamentoAlteracaoCardapio}
    textoBotaoNaoAprova="Não"
    textoBotaoAprova="Ciente"
  />
);
