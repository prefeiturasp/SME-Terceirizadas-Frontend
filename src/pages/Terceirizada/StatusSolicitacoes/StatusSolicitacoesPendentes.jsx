import React from "react";
import { STATUS } from "../../../components/screens/const";
import StatusSolicitacoes from "../../../components/screens/DashboardTerceirizada/StatusSolicitacoes";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import {
  SOLICITACOES_PENDENTES,
  TERCEIRIZADA
} from "../../../configs/constants";
import { HOME } from "../constants";

const atual = {
  href: `/${TERCEIRIZADA}/${SOLICITACOES_PENDENTES}`,
  titulo: "Solicitações Pendentes"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={HOME}>
    <Breadcrumb home={HOME} atual={atual} />
    <StatusSolicitacoes tipoStatus={STATUS.PENDENTES} />
  </Page>
);
