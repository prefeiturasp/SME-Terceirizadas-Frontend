import React from "react";

import { HOME } from "constants/config";

import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";

import PeriodoLancamentoMedicaoInicial from "components/screens/LancamentoInicial/PeriodoLancamentoMedicaoInicial";
import {
  LANCAMENTO_INICIAL,
  LANCAMENTO_MEDICAO_INICIAL,
  PERIODO_LANCAMENTO,
} from "configs/constants";

const anteriores = [
  {
    href: `/${LANCAMENTO_INICIAL}/${LANCAMENTO_MEDICAO_INICIAL}`,
    titulo: "Medição Inicial",
  },
];

const atual = {
  href: `/${LANCAMENTO_INICIAL}/${LANCAMENTO_MEDICAO_INICIAL}/${PERIODO_LANCAMENTO}`,
  titulo: "Lançamento Medição Inicial",
};

export default () => (
  <Page titulo={atual.titulo}>
    <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
    <PeriodoLancamentoMedicaoInicial />
  </Page>
);
