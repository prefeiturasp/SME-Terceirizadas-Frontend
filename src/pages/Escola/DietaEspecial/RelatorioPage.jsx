import React from "react";
import Relatorio from "../../../components/screens/DietaEspecial/Relatorio";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import { DIETA_ESPECIAL, ESCOLA, RELATORIO } from "../../../configs/constants";
import { HOME } from "../constants";

const atual = {
  href: `${ESCOLA}/${DIETA_ESPECIAL}/${RELATORIO}`,
  titulo: "Relatório"
};

const anteriores = [
  {
    href: `/${ESCOLA}/${DIETA_ESPECIAL}`,
    titulo: "Dieta Especial"
  }
];

export default () => (
  <Page botaoVoltar voltarPara={`/${ESCOLA}/${DIETA_ESPECIAL}`}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <Relatorio />
  </Page>
);
