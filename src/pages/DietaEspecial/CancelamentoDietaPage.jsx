import React from "react";

import { HOME } from "constants/config";

import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";

import CancelamentoDieta from "components/screens/DietaEspecial/CancelamentoDieta";
import { DIETA_ESPECIAL, CANCELAMENTO } from "configs/constants";

const atual = {
  href: `/${DIETA_ESPECIAL}/${CANCELAMENTO}`,
  titulo: "Cancelamento de Dieta Especial"
};

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} />
    <CancelamentoDieta />
  </Page>
);
