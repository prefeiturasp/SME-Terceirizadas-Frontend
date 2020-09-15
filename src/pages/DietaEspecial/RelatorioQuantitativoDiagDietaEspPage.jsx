import React from "react";

import { HOME } from "constants/config";

import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";

import RelatorioQuantitativoDiagDietaEsp from "components/screens/DietaEspecial/RelatorioQuantitativoDiagDietaEsp";
import {
  DIETA_ESPECIAL,
  RELATORIO_QUANTITATIVO_SOLIC_DIETA_ESP
} from "configs/constants";

const atual = {
  href: `/${DIETA_ESPECIAL}/${RELATORIO_QUANTITATIVO_SOLIC_DIETA_ESP}`,
  titulo: "Relatório Quantitativo por Diagnóstico de Dieta Especial"
};

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} />
    <RelatorioQuantitativoDiagDietaEsp />
  </Page>
);
