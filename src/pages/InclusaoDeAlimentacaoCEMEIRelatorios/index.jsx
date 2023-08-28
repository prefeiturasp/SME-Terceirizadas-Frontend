import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { getMotivosDREnaoValida } from "services/relatorios";
import Page from "components/Shareable/Page/Page";
import Breadcrumb from "components/Shareable/Breadcrumb";
import { HOME } from "constants/config";
import { RelatorioInclusaoDeAlimentacaoCEMEI } from "components/InclusaoDeAlimentacaoCEMEI/Relatorio";
import { ModalCancelarInclusaoAlimentacao } from "components/Shareable/ModalCancelarInclusaoAlimentacao";
import { ModalNaoValidarFinalForm } from "components/Shareable/ModalNaoValidarFinalForm";
import { ModalNegarFinalForm } from "components/Shareable/ModalNegarFinalForm";
import { ModalCODAEQuestionaFinalForm } from "components/Shareable/ModalCODAEQuestionaFinalForm";
import { ModalTercRespondeQuestFinalForm } from "components/Shareable/ModalTercRespondeQuestFinalForm";
import { ModalCODAEAutoriza } from "components/Shareable/ModalCODAEAutoriza";
import { CODAE, DRE, ESCOLA, TERCEIRIZADA } from "configs/constants";
import {
  codaeAutorizarSolicitacaoDeInclusaoDeAlimentacao,
  codaeNegarSolicitacaoDeInclusaoDeAlimentacao,
  codaeQuestionarSolicitacaoDeInclusaoDeAlimentacao,
  dreReprovarSolicitacaoDeInclusaoDeAlimentacao,
  dreValidarSolicitacaoDeInclusaoDeAlimentacao,
  escolaCancelarSolicitacaoDeInclusaoDeAlimentacao,
  terceirizadaDarCienciaDeInclusaoDeAlimentacao,
  terceirizadaResponderQuestionamentoDeInclusaoDeAlimentacao,
} from "services/inclusaoDeAlimentacao";
import { TIPO_SOLICITACAO } from "constants/shared";

export const RelatorioBase = ({ ...props }) => {
  const [motivosDREnaoValida, setMotivosDREnaoValida] = useState();

  useEffect(() => {
    const getMotivosDREnaoValidaData = async () => {
      const response = await getMotivosDREnaoValida();
      if (response.status === HTTP_STATUS.OK) {
        setMotivosDREnaoValida(response.data.results);
      }
    };

    getMotivosDREnaoValidaData();
  }, []);

  const anteriores = [
    {
      href: `/painel-gestao-alimentacao`,
      titulo: "Gestão de Alimentação",
    },
    {
      href: `/painel-gestao-alimentacao`,
      titulo: "Painel de Solicitações",
    },
  ];

  const atual = {
    href: "#",
    titulo: "Relatório",
  };

  return (
    <Page botaoVoltar>
      <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
      <RelatorioInclusaoDeAlimentacaoCEMEI
        motivosDREnaoValida={motivosDREnaoValida}
        {...props}
      />
    </Page>
  );
};

// Escola
export const RelatorioEscola = () => {
  return (
    <RelatorioBase
      visao={ESCOLA}
      ModalNaoAprova={ModalCancelarInclusaoAlimentacao}
      toastNaoAprovaMensagem={"Inclusão de Alimentação cancelada com sucesso!"}
      endpointNaoAprovaSolicitacao={
        escolaCancelarSolicitacaoDeInclusaoDeAlimentacao
      }
      textoBotaoNaoAprova="Cancelar"
      tipoSolicitacao={TIPO_SOLICITACAO.SOLICITACAO_CEMEI}
    />
  );
};

export const RelatorioDRE = () => {
  return (
    <RelatorioBase
      visao={DRE}
      ModalNaoAprova={ModalNaoValidarFinalForm}
      toastNaoAprovaMensagem={
        "Inclusão de Alimentação não validada com sucesso!"
      }
      toastAprovaMensagem={"Inclusão de Alimentação validada com sucesso!"}
      toastAprovaMensagemErro={
        "Houve um erro ao validar a Inclusão de Alimentação"
      }
      endpointAprovaSolicitacao={dreValidarSolicitacaoDeInclusaoDeAlimentacao}
      endpointNaoAprovaSolicitacao={
        dreReprovarSolicitacaoDeInclusaoDeAlimentacao
      }
      textoBotaoNaoAprova="Não Validar"
      textoBotaoAprova="Validar"
      tipoSolicitacao={TIPO_SOLICITACAO.SOLICITACAO_CEMEI}
    />
  );
};

export const RelatorioCODAE = () => {
  return (
    <RelatorioBase
      visao={CODAE}
      ModalNaoAprova={ModalNegarFinalForm}
      ModalQuestionamento={ModalCODAEQuestionaFinalForm}
      ModalCodaeAutoriza={ModalCODAEAutoriza}
      toastAprovaMensagem={"Inclusão de alimentação autorizada com sucesso!"}
      toastAprovaMensagemErro={
        "Houve um erro ao autorizar a Inclusão de Alimentação"
      }
      endpointNaoAprovaSolicitacao={
        codaeNegarSolicitacaoDeInclusaoDeAlimentacao
      }
      endpointAprovaSolicitacao={
        codaeAutorizarSolicitacaoDeInclusaoDeAlimentacao
      }
      endpointQuestionamento={codaeQuestionarSolicitacaoDeInclusaoDeAlimentacao}
      textoBotaoNaoAprova="Negar"
      textoBotaoAprova="Autorizar"
      tipoSolicitacao={TIPO_SOLICITACAO.SOLICITACAO_CEMEI}
    />
  );
};

export const RelatorioTerceirizada = () => {
  return (
    <RelatorioBase
      visao={TERCEIRIZADA}
      ModalNaoAprova={ModalTercRespondeQuestFinalForm}
      ModalQuestionamento={ModalTercRespondeQuestFinalForm}
      toastAprovaMensagem={
        "Ciência de Inclusão de Alimentação enviado com sucesso!"
      }
      toastAprovaMensagemErro={
        "Houve um erro ao tomar ciência da Inclusão de Alimentação"
      }
      endpointAprovaSolicitacao={terceirizadaDarCienciaDeInclusaoDeAlimentacao}
      endpointNaoAprovaSolicitacao={
        terceirizadaResponderQuestionamentoDeInclusaoDeAlimentacao
      }
      endpointQuestionamento={
        terceirizadaResponderQuestionamentoDeInclusaoDeAlimentacao
      }
      textoBotaoNaoAprova="Não"
      textoBotaoAprova="Ciente"
      tipoSolicitacao={TIPO_SOLICITACAO.SOLICITACAO_CEMEI}
    />
  );
};
