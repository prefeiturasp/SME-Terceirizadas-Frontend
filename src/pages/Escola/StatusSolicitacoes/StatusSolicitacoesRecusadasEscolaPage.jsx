import React from "react";
import { STATUS } from "../../../components/screens/const";
import StatusSolicitacoes from "../../../components/screens/DashboardEscola/StatusSolicitacoes";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import { ESCOLA, SOLICITACOES_NEGADAS } from "../../../configs/constants";
import { HOME } from "../constants";

const atual = {
  href: `/${ESCOLA}/${SOLICITACOES_NEGADAS}`,
  titulo: "Solicitações Negadas"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={HOME}>
    <Breadcrumb home={HOME} atual={atual} />
    <StatusSolicitacoes tipoStatus={STATUS.RECUSADAS} />
  </Page>
);
