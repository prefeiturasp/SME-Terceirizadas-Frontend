import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Relatorio from "../../components/SolicitacaoDeKitLanche/Relatorio";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "../../constants/config.constants";
import { ESCOLA, DRE, CODAE, TERCEIRIZADA } from "../../configs/constants";
import {
  cancelaKitLancheAvulsoEscola,
  DRENaoValidaKitLancheAvulso,
  DREValidaKitLancheAvulso,
  CODAENegaKitLancheAvulso,
  CODAEquestionaKitLancheAvulso,
  CODAEAutorizaKitLancheAvulso,
  terceirizadaTomaCienciaKitLancheAvulso,
  terceirizadaRespondeQuestionamentoKitLancheAvulso
} from "../../services/solicitacaoDeKitLanche.service";
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
    toastNaoAprovaMensagem={"Kit Lanche Passeio cancelado com sucesso!"}
    endpointNaoAprovaSolicitacao={cancelaKitLancheAvulsoEscola}
    textoBotaoNaoAprova="Cancelar"
  />
);

// DRE
export const RelatorioDRE = () => (
  <RelatorioBase
    visao={DRE}
    ModalNaoAprova={ModalNaoValidarSolicitacao}
    toastAprovaMensagem={"Kit Lanche Passeio validado com sucesso!"}
    toastAprovaMensagemErro={"Houve um erro ao validar o Kit Lanche Passeio"}
    endpointNaoAprovaSolicitacao={DRENaoValidaKitLancheAvulso}
    endpointAprovaSolicitacao={DREValidaKitLancheAvulso}
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
    toastAprovaMensagem={"Kit Lanche Passeio autorizado com sucesso!"}
    toastAprovaMensagemErro={"Houve um erro ao autorizar o Kit Lanche Passeio"}
    endpointNaoAprovaSolicitacao={CODAENegaKitLancheAvulso}
    endpointAprovaSolicitacao={CODAEAutorizaKitLancheAvulso}
    endpointQuestionamento={CODAEquestionaKitLancheAvulso}
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
    toastAprovaMensagem={"Ciência de Kit Lanche Passeio enviado com sucesso!"}
    toastAprovaMensagemErro={
      "Houve um erro ao tomar ciência do Kit Lanche Passeio"
    }
    endpointAprovaSolicitacao={terceirizadaTomaCienciaKitLancheAvulso}
    endpointNaoAprovaSolicitacao={
      terceirizadaRespondeQuestionamentoKitLancheAvulso
    }
    endpointQuestionamento={terceirizadaRespondeQuestionamentoKitLancheAvulso}
    textoBotaoNaoAprova="Não"
    textoBotaoAprova="Ciente"
  />
);
