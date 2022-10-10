import React from "react";
import { ESCOLA } from "configs/constants";
import { cancelaFluxoSolicitacaoKitLancheCEMEI } from "services/kitLanche";
import Page from "components/Shareable/Page/Page";
import Breadcrumb from "components/Shareable/Breadcrumb";
import { Relatorio } from "components/SolicitacaoKitLancheCEMEI/Relatorio";
import { ModalKitLanche } from "components/SolicitacaoKitLancheCEMEI/Relatorio/components/ModalKitLancheCEMEI";

export const RelatorioBase = ({ ...props }) => {
  const atual = {
    href: "#",
    titulo: "Relatório"
  };

  return (
    <Page>
      <Breadcrumb home="/" atual={atual} />
      <Relatorio {...props} />
    </Page>
  );
};

// Escola
export const RelatorioEscola = () => (
  <RelatorioBase
    visao={ESCOLA}
    ModalNaoAprova={ModalKitLanche}
    toastNaoAprovaMensagem={"Kit Lanche Passeio cancelado com sucesso!"}
    endpointNaoAprovaSolicitacao={cancelaFluxoSolicitacaoKitLancheCEMEI}
    textoBotaoNaoAprova="Cancelar"
  />
);
