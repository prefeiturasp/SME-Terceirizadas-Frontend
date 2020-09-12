import React from "react";

import { HOME } from "constants/config";

import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";

import RelatorioQuantitativoSolicDietaEsp from "components/screens/DietaEspecial/RelatorioQuantitativoSolicDietaEsp";

export default () => (
  <Page botaoVoltar voltarPara={HOME}>
    <Breadcrumb home={HOME} />
    <RelatorioQuantitativoSolicDietaEsp />
  </Page>
);
