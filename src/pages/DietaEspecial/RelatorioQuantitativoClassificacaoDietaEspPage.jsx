import React from "react";

import { HOME } from "constants/config";

import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";

import RelatorioQuantitativoClassificacaoDietaEsp from "components/screens/DietaEspecial/RelatorioQuantitativoClassificacaoDietaEsp";
import {
  DIETA_ESPECIAL,
  RELATORIO_QUANTITATIVO_CLASSIFICACAO_DIETA_ESP
} from "configs/constants";

const atual = {
  href: `/${DIETA_ESPECIAL}/${RELATORIO_QUANTITATIVO_CLASSIFICACAO_DIETA_ESP}`,
  titulo: "Relatório Quantitativo por Classificação da Dieta Especial"
};

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} />
    <RelatorioQuantitativoClassificacaoDietaEsp />
  </Page>
);
