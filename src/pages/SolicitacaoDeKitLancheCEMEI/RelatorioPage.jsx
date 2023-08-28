import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { CODAE, DRE, ESCOLA, TERCEIRIZADA } from "configs/constants";
import Page from "components/Shareable/Page/Page";
import Breadcrumb from "components/Shareable/Breadcrumb";
import { Relatorio } from "components/SolicitacaoKitLancheCEMEI/Relatorio";
// import { ModalTerceirizadaRespondeQuestionamento } from "components/Shareable/ModalTerceirizadaRespondeQuestionamento";
import { ModalCancelarKitLancheCEMEI } from "components/SolicitacaoKitLancheCEMEI/Relatorio/components/ModalCancelarKitLancheCEMEI";
import { ModalNaoValidarFinalForm } from "components/Shareable/ModalNaoValidarFinalForm";
import {
  cancelaFluxoSolicitacaoKitLancheCEMEI,
  CODAEAutorizaKitLancheCEMEI,
  CODAENegaKitLancheCEMEI,
  CODAEquestionaKitLancheCEMEI,
  DRENaoValidaKitLancheCEMEI,
  DREValidaKitLancheCEMEI,
  terceirizadaRespondeQuestionamentoKitLanche,
  terceirizadaTomaCienciaKitLanche,
} from "services/kitLanche";
import { getMotivosDREnaoValida } from "services/relatorios";
import { ModalNegarFinalForm } from "components/Shareable/ModalNegarFinalForm";
import { ModalCODAEQuestionaFinalForm } from "components/Shareable/ModalCODAEQuestionaFinalForm";
import { ModalTercRespondeQuestFinalForm } from "components/Shareable/ModalTercRespondeQuestFinalForm";

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
    titulo: "Relatório",
  };

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

  return (
    <Page>
      <Breadcrumb home="/" anteriores={anteriores} atual={atual} />
      <Relatorio motivosDREnaoValida={motivosDREnaoValida} {...props} />
    </Page>
  );
};

export const RelatorioEscola = () => (
  <RelatorioBase
    visao={ESCOLA}
    ModalNaoAprova={ModalCancelarKitLancheCEMEI}
    toastNaoAprovaMensagem={"Kit Lanche Passeio cancelado com sucesso!"}
    endpointNaoAprovaSolicitacao={cancelaFluxoSolicitacaoKitLancheCEMEI}
    textoBotaoNaoAprova="Cancelar"
  />
);

export const RelatorioDRE = () => (
  <RelatorioBase
    visao={DRE}
    ModalNaoAprova={ModalNaoValidarFinalForm}
    toastAprovaMensagem={"Kit Lanche Passeio validado com sucesso!"}
    toastAprovaMensagemErro={"Houve um erro ao validar o Kit Lanche Passeio"}
    endpointNaoAprovaSolicitacao={DRENaoValidaKitLancheCEMEI}
    endpointAprovaSolicitacao={DREValidaKitLancheCEMEI}
    textoBotaoNaoAprova="Não Validar"
    textoBotaoAprova="Validar"
  />
);

export const RelatorioCODAE = () => (
  <RelatorioBase
    visao={CODAE}
    ModalNaoAprova={ModalNegarFinalForm}
    ModalQuestionamento={ModalCODAEQuestionaFinalForm}
    toastAprovaMensagem={"Kit Lanche Passeio autorizado com sucesso!"}
    toastAprovaMensagemErro={"Houve um erro ao autorizar o Kit Lanche Passeio"}
    endpointNaoAprovaSolicitacao={CODAENegaKitLancheCEMEI}
    endpointAprovaSolicitacao={CODAEAutorizaKitLancheCEMEI}
    endpointQuestionamento={CODAEquestionaKitLancheCEMEI}
    textoBotaoNaoAprova="Negar"
    textoBotaoAprova="Autorizar"
  />
);

export const RelatorioTerceirizada = () => (
  <RelatorioBase
    visao={TERCEIRIZADA}
    ModalNaoAprova={ModalTercRespondeQuestFinalForm}
    ModalQuestionamento={ModalTercRespondeQuestFinalForm}
    toastAprovaMensagem={"Ciência de Kit Lanche Passeio enviado com sucesso!"}
    toastAprovaMensagemErro={
      "Houve um erro ao tomar ciência do Kit Lanche Passeio"
    }
    endpointAprovaSolicitacao={terceirizadaTomaCienciaKitLanche}
    endpointNaoAprovaSolicitacao={terceirizadaRespondeQuestionamentoKitLanche}
    endpointQuestionamento={terceirizadaRespondeQuestionamentoKitLanche}
    textoBotaoNaoAprova="Não"
    textoBotaoAprova="Ciente"
  />
);
