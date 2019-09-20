import React from "react";
import StatusSolicitacoes from "../../../components/screens/DashboardEscola/StatusSolicitacoes";
import { ESCOLA, SOLICITACOES_AUTORIZADAS } from "../../../configs/constants";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import { HOME } from "../constants";

const atual = {
  href: `/${ESCOLA}/${SOLICITACOES_AUTORIZADAS}`,
  titulo: "Solicitações Autorizadas"
};

export default props => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={HOME}>
    <Breadcrumb home={HOME} atual={atual} />
    <StatusSolicitacoes showAutorizadas={true} />
  </Page>
);
