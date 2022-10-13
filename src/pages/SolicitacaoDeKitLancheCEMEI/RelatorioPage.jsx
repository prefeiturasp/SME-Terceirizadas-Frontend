import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { DRE, ESCOLA } from "configs/constants";
import Page from "components/Shareable/Page/Page";
import Breadcrumb from "components/Shareable/Breadcrumb";
import { Relatorio } from "components/SolicitacaoKitLancheCEMEI/Relatorio";
import { ModalCancelarKitLancheCEMEI } from "components/SolicitacaoKitLancheCEMEI/Relatorio/components/ModalCancelarKitLancheCEMEI";
import { ModalNaoValidarKitLancheCEMEI } from "components/SolicitacaoKitLancheCEMEI/Relatorio/components/ModalNaoValidarKitLancheCEMEI";
import {
  cancelaFluxoSolicitacaoKitLancheCEMEI,
  DRENaoValidaKitLancheCEMEI,
  DREValidaKitLancheCEMEI
} from "services/kitLanche";
import { getMotivosDREnaoValida } from "services/relatorios";

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

  const atual = {
    href: "#",
    titulo: "Relatório"
  };

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

  return (
    <Page>
      <Breadcrumb home="/" anteriores={anteriores} atual={atual} />
      <Relatorio motivosDREnaoValida={motivosDREnaoValida} {...props} />
    </Page>
  );
};

// Escola
export const RelatorioEscola = () => (
  <RelatorioBase
    visao={ESCOLA}
    ModalNaoAprova={ModalCancelarKitLancheCEMEI}
    toastNaoAprovaMensagem={"Kit Lanche Passeio cancelado com sucesso!"}
    endpointNaoAprovaSolicitacao={cancelaFluxoSolicitacaoKitLancheCEMEI}
    textoBotaoNaoAprova="Cancelar"
  />
);

// DRE
export const RelatorioDRE = () => (
  <RelatorioBase
    visao={DRE}
    ModalNaoAprova={ModalNaoValidarKitLancheCEMEI}
    toastAprovaMensagem={"Kit Lanche Passeio validado com sucesso!"}
    toastAprovaMensagemErro={"Houve um erro ao validar o Kit Lanche Passeio"}
    endpointNaoAprovaSolicitacao={DRENaoValidaKitLancheCEMEI}
    endpointAprovaSolicitacao={DREValidaKitLancheCEMEI}
    textoBotaoNaoAprova="Não Validar"
    textoBotaoAprova="Validar"
  />
);
