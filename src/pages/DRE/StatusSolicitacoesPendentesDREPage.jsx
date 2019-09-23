import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import StatusSolicitacoes from "../../components/screens/DashboardDRE/StatusSolicitacoes";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "./constants";
import { DRE, SOLICITACOES_PENDENTES } from "../../configs/constants";

const atual = {
  href: `/${DRE}/${SOLICITACOES_PENDENTES}`,
  titulo: "Solicitações Pendentes"
};

export default props => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={HOME}>
    <Breadcrumb home={HOME} atual={atual} />
    <StatusSolicitacoes showPendentes={true} />
  </Page>
);
