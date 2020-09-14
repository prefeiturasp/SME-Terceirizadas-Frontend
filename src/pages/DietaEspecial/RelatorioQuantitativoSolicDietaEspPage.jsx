import React from "react";

import { HOME } from "constants/config";

import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";

import RelatorioQuantitativoSolicDietaEsp from "components/screens/DietaEspecial/RelatorioQuantitativoSolicDietaEsp";
import {
  DIETA_ESPECIAL,
  RELATORIO_QUANTITATIVO_SOLIC_DIETA_ESP
} from "configs/constants";

const atual = {
  href: `/${DIETA_ESPECIAL}/${RELATORIO_QUANTITATIVO_SOLIC_DIETA_ESP}`,
  titulo: "Relatório Quantitativo de Solicitações de Dieta Especial"
};

export default () => (
  <Page
    botaoVoltar
    voltarPara="/"
    titulo={"Relatório Quantitativo de Solicitações de Dieta Especial"}
  >
    <Breadcrumb home={HOME} atual={atual} />
    <RelatorioQuantitativoSolicDietaEsp />
  </Page>
);
