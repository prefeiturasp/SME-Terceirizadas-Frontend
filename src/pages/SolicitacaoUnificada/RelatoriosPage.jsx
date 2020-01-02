import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Relatorio from "../../components/SolicitacaoUnificada/Relatorio";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "../../constants/config.constants";
import {
  SOLICITACAO_KIT_LANCHE_UNIFICADA,
  DRE,
  CODAE,
  TERCEIRIZADA
} from "../../configs/constants";
import {
  cancelaKitLancheUnificadoDre,
  TerceirizadaTomaCienciaSolicitacoUnificada,
  CODAENegaKitLancheUnificadoEscola,
  CODAEAutorizaPedidoKitLancheUnificado,
  terceirizadaRespondeQuestionamentoSolitacaoUnificada,
  CODAEquestionaSolicitacaoUnificada
} from "../../services/solicitacaoUnificada.service";
import { ModalCancelarSolicitacao } from "../../components/Shareable/ModalCancelarSolicitacao_";
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
        href: `/${this.props.VISAO}/${SOLICITACAO_KIT_LANCHE_UNIFICADA}`,
        titulo: "Solicitação Unificada"
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

// DRE
export const RelatorioDRE = () => (
  <RelatorioBase
    VISAO={DRE}
    ModalNaoAprova={ModalCancelarSolicitacao}
    toastNaoAprovaMensagem={"Solicitação Unificada cancelada com sucesso!"}
    endpointNaoAprovaSolicitacao={cancelaKitLancheUnificadoDre}
    textoBotaoNaoAprova="Cancelar"
  />
);

// CODAE
export const RelatorioCODAE = () => (
  <RelatorioBase
    VISAO={CODAE}
    ModalNaoAprova={ModalNegarSolicitacao}
    ModalQuestionamento={ModalCODAEQuestiona}
    toastAprovaMensagem={"Solicitação Unificada autorizada com sucesso!"}
    toastAprovaMensagemErro={
      "Houve um erro ao autorizar a Solicitação Unificada"
    }
    endpointNaoAprovaSolicitacao={CODAENegaKitLancheUnificadoEscola}
    endpointAprovaSolicitacao={CODAEAutorizaPedidoKitLancheUnificado}
    endpointQuestionamento={CODAEquestionaSolicitacaoUnificada}
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
      "Ciência de Solicitação Unificada enviado com sucesso!"
    }
    toastAprovaMensagemErro={
      "Houve um erro ao tomar ciência da Solicitação Unificada"
    }
    endpointAprovaSolicitacao={TerceirizadaTomaCienciaSolicitacoUnificada}
    endpointNaoAprovaSolicitacao={
      terceirizadaRespondeQuestionamentoSolitacaoUnificada
    }
    endpointQuestionamento={
      terceirizadaRespondeQuestionamentoSolitacaoUnificada
    }
    textoBotaoNaoAprova="Não"
    textoBotaoAprova="Ciente"
  />
);
