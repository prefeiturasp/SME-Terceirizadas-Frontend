import React from "react";

import { HOME } from "constants/config";

import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";

import { DIETA_ESPECIAL, RELATORIO_GERENCIAL_DIETAS } from "configs/constants";

const atual = {
  href: `/${DIETA_ESPECIAL}/${RELATORIO_GERENCIAL_DIETAS}`,
  titulo: "Relatório Gerencial de Dietas",
};

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} />
    <></>
  </Page>
);
