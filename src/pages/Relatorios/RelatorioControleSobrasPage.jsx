import React from "react";

import { HOME } from "constants/config";

import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";

import { CONTROLE_SOBRAS, RELATORIO_CONTROLE_SOBRAS } from "configs/constants";
import RelatorioControleSobras from "components/screens/ControleSobras/RelatorioControleSobras";

const atual = {
  href: `/${CONTROLE_SOBRAS}/${RELATORIO_CONTROLE_SOBRAS}`,
  titulo: "Relatório de Controle de Sobras",
};

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} />
    <RelatorioControleSobras />
  </Page>
);
