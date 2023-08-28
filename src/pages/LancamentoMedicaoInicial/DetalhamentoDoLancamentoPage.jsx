import React from "react";

import { HOME } from "constants/config";

import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";

import LancamentoMedicaoInicial from "components/screens/LancamentoInicial/LancamentoMedicaoInicial";
import {
  ACOMPANHAMENTO_DE_LANCAMENTOS,
  DETALHAMENTO_DO_LANCAMENTO,
  MEDICAO_INICIAL,
} from "configs/constants";

const atual = {
  href: `/${MEDICAO_INICIAL}/${DETALHAMENTO_DO_LANCAMENTO}`,
  titulo: "Detalhamento do Lançamento",
};

const anteriores = [
  {
    href: `/${MEDICAO_INICIAL}/${ACOMPANHAMENTO_DE_LANCAMENTOS}`,
    titulo: "Medição Inicial",
  },
];

export default () => (
  <Page botaoVoltar titulo={"Detalhamento do Lançamento da Medição Inicial"}>
    <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
    <LancamentoMedicaoInicial />
  </Page>
);
