import React from "react";

import { HOME } from "constants/config";

import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";

import { AcompanhamentoDeLancamentos } from "components/screens/LancamentoInicial/AcompanhamentoDeLancamentos";
import {
  ACOMPANHAMENTO_DE_LANCAMENTOS,
  MEDICAO_INICIAL,
} from "configs/constants";

const atual = {
  href: `/${MEDICAO_INICIAL}/${ACOMPANHAMENTO_DE_LANCAMENTOS}`,
  titulo: "Medição Inicial",
};

export default () => (
  <Page botaoVoltar voltarPara={HOME} titulo={"Acompanhamento de Lançamentos"}>
    <Breadcrumb home={HOME} atual={atual} />
    <AcompanhamentoDeLancamentos />
  </Page>
);
