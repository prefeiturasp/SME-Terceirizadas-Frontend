import React from "react";

import { HOME } from "constants/config";

import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";

import LancamentoMedicaoInicial from "components/screens/LancamentoInicial/LancamentoMedicaoInicial";
import {
  LANCAMENTO_INICIAL,
  LANCAMENTO_MEDICAO_INICIAL
} from "configs/constants";

const atual = {
  href: `/${LANCAMENTO_INICIAL}/${LANCAMENTO_MEDICAO_INICIAL}`,
  titulo: "Lançamento de Medição Inicial"
};

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} />
    <LancamentoMedicaoInicial />
  </Page>
);
