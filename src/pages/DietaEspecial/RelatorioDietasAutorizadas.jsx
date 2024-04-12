import React from "react";

import { HOME } from "constants/config";

import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";

import { RelatorioDietasAutorizadas } from "components/screens/DietaEspecial/RelatorioDietasAutorizadas";
import {
  DIETA_ESPECIAL,
  RELATORIO_DIETAS_AUTORIZADAS,
} from "configs/constants";

const atual = {
  href: `/${DIETA_ESPECIAL}/${RELATORIO_DIETAS_AUTORIZADAS}`,
  titulo: "Relatório de Dietas Autorizadas",
};

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} />
    <RelatorioDietasAutorizadas />
  </Page>
);
