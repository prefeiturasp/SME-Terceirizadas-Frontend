import React from "react";

import { HOME } from "constants/config";

import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";

import RelatorioDietaEspecial from "components/screens/DietaEspecial/RelatorioDietaEspecial";
import { DIETA_ESPECIAL, RELATORIO_DIETA_ESPECIAL } from "configs/constants";

const atual = {
  href: `/${DIETA_ESPECIAL}/${RELATORIO_DIETA_ESPECIAL}`,
  titulo: "Relatório de Dieta Especial"
};

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} />
    <RelatorioDietaEspecial />
  </Page>
);
