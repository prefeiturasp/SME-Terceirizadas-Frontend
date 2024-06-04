import React from "react";

import { HOME } from "constants/config";

import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";

import { RelatorioDietasCanceladas } from "components/screens/DietaEspecial/RelatorioDietasCanceladas";
import { DIETA_ESPECIAL, RELATORIO_DIETAS_CANCELADAS } from "configs/constants";

const atual = {
  href: `/${DIETA_ESPECIAL}/${RELATORIO_DIETAS_CANCELADAS}`,
  titulo: "Relatório de Dietas Canceladas",
};

const anteriores = [
  {
    href: "/painel-dieta-especial",
    titulo: "Dieta Especial",
  },
  {
    href: "#",
    titulo: "Relatórios",
  },
];

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
    <RelatorioDietasCanceladas />
  </Page>
);
