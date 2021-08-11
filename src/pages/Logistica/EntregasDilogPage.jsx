import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { ENTREGAS_DILOG, LOGISTICA } from "configs/constants";
import ConsultaEntregas from "components/screens/Logistica/ConsultaEntregas";

const atual = {
  href: `/${LOGISTICA}/${ENTREGAS_DILOG}`,
  titulo: "Entregas"
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
    <ConsultaEntregas dilog />
  </Page>
);
