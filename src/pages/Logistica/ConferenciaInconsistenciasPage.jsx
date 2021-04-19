import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { CONFERENCIA_INCONSISTENCIAS, LOGISTICA } from "configs/constants";
import ConferenciaInconsistencias from "components/screens/Logistica/ConferenciaInconsistencias";

const atual = {
  href: `/${LOGISTICA}/${CONFERENCIA_INCONSISTENCIAS}`,
  titulo: "Conferência de Inconsistências"
};

const anteriores = [
  {
    href: `/`,
    titulo: "Abastecimento"
  }
];

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <ConferenciaInconsistencias />
  </Page>
);
