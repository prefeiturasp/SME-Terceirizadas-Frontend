import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import StatusSolicitacoes from "../../../components/screens/DashboardCODAE/StatusSolicitacoes";
import Page from "../../../components/Shareable/Page/Page";
import { HOME } from "../constants";
import { CODAE, SOLICITACOES_NEGADAS } from "../../../configs/constants";
import { STATUS } from "../../../components/screens/const";

const atual = {
  href: `/${CODAE}/${SOLICITACOES_NEGADAS}`,
  titulo: "Solicitações Negadas"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={HOME}>
    <Breadcrumb home={HOME} atual={atual} />
    <StatusSolicitacoes tipoStatus={STATUS.RECUSADAS} />
  </Page>
);
