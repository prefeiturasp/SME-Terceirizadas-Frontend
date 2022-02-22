import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import StatusSolicitacoesNutriManifestacao from "../../../components/screens/DashboardNutricionista/StatusSolicitacoesNutriManifestacao";
import Page from "../../../components/Shareable/Page/Page";
import { HOME } from "../constants";
import {
  NUTRIMANIFESTACAO,
  SOLICITACOES_AUTORIZADAS
} from "../../../configs/constants";
import { STATUS } from "../../../components/screens/const";

const atual = {
  href: `/${NUTRIMANIFESTACAO}/${SOLICITACOES_AUTORIZADAS}`,
  titulo: "Solicitações Autorizadas"
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={HOME}>
    <Breadcrumb home={HOME} atual={atual} />
    <StatusSolicitacoesNutriManifestacao tipoStatus={STATUS.AUTORIZADAS} />
  </Page>
);
