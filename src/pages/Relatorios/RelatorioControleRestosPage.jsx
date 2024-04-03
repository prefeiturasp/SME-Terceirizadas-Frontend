import React from "react";

import { HOME } from "constants/config";

import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";

import { CONTROLE_RESTOS, RELATORIO_CONTROLE_RESTOS } from "configs/constants";
import RelatorioControleRestos from "components/screens/ControleRestos/RelatorioControleRestos";

const atual = {
  href: `/${CONTROLE_RESTOS}/${RELATORIO_CONTROLE_RESTOS}`,
  titulo: "Relatório de Controle de Restos",
};

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} />
    <RelatorioControleRestos />
  </Page>
);
