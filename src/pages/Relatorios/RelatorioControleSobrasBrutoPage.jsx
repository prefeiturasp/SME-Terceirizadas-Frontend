import React from "react";

import { HOME } from "constants/config";

import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";

import {
  DESPERDICIO,
  RELATORIOS,
  RELATORIO_CONTROLE_SOBRAS_BRUTO,
} from "configs/constants";
import RelatorioControleSobrasBruto from "components/screens/ControleSobras/RelatorioControleSobrasBruto";

const atual = {
  href: `/${DESPERDICIO}/${RELATORIOS}/${RELATORIO_CONTROLE_SOBRAS_BRUTO}`,
  titulo: "Relatório de Controle de Sobras - Bruto",
};

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} />
    <RelatorioControleSobrasBruto />
  </Page>
);
