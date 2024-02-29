import React from "react";

import { HOME } from "constants/config";

import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { PeriodoLancamentoMedicaoInicialCEI } from "components/screens/LancamentoInicial/PeriodoLancamentoMedicaoInicialCEI";

import {
  LANCAMENTO_INICIAL,
  LANCAMENTO_MEDICAO_INICIAL,
  PERIODO_LANCAMENTO_CEI,
} from "configs/constants";

const anteriores = [
  {
    href: `/${LANCAMENTO_INICIAL}/${LANCAMENTO_MEDICAO_INICIAL}`,
    titulo: "Medição Inicial",
  },
];

const atual = {
  href: `/${LANCAMENTO_INICIAL}/${LANCAMENTO_MEDICAO_INICIAL}/${PERIODO_LANCAMENTO_CEI}`,
  titulo: "Lançamento Medição Inicial",
};

export default () => (
  <Page titulo={atual.titulo}>
    <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
    <PeriodoLancamentoMedicaoInicialCEI />
  </Page>
);
