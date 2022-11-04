import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { getMotivosDREnaoValida } from "services/relatorios";
import Page from "components/Shareable/Page/Page";
import Breadcrumb from "components/Shareable/Breadcrumb";
import { HOME } from "constants/config";
import { RelatorioInclusaoDeAlimentacaoCEMEI } from "components/InclusaoDeAlimentacaoCEMEI/Relatorio";
import { DRE, ESCOLA } from "configs/constants";
import { ModalCancelarInclusaoAlimentacao } from "components/Shareable/ModalCancelarInclusaoAlimentacao";
import {
  dreReprovarSolicitacaoDeInclusaoDeAlimentacao,
  dreValidarSolicitacaoDeInclusaoDeAlimentacao,
  escolaCancelarSolicitacaoDeInclusaoDeAlimentacao
} from "services/inclusaoDeAlimentacao";
import { TIPO_SOLICITACAO } from "constants/shared";
import { ModalNaoValidarKitLancheCEMEI } from "components/SolicitacaoKitLancheCEMEI/Relatorio/components/ModalNaoValidarKitLancheCEMEI";

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
      titulo: "Gestão de Alimentação"
    },
    {
      href: `/painel-gestao-alimentacao`,
      titulo: "Painel de Solicitações"
    }
  ];

  const atual = {
    href: "#",
    titulo: "Relatório"
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
      ModalNaoAprova={ModalNaoValidarKitLancheCEMEI}
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
