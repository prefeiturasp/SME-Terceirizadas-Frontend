import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import StatusSolicitacoes from "../../../components/screens/DashboardNutricionista/StatusSolicitacoes";
import Page from "../../../components/Shareable/Page/Page";
import { HOME } from "../constants";
import {
  NUTRISUPERVISAO,
  SOLICITACOES_COM_QUESTIONAMENTO
} from "../../../configs/constants";
import { STATUS } from "../../../components/screens/const";

const atual = {
  href: `/${NUTRISUPERVISAO}/${SOLICITACOES_COM_QUESTIONAMENTO}`,
  titulo: "Solicitações com Questionamentos"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={HOME}>
    <Breadcrumb home={HOME} atual={atual} />
    <StatusSolicitacoes tipoStatus={STATUS.QUESTIONADAS} />
  </Page>
);
