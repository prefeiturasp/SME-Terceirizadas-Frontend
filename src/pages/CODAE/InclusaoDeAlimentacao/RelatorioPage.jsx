import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Relatorio from "../../../components/InclusaoDeAlimentacao/CODAE/Relatorio";
import { HOME } from "../constants";
import { INCLUSAO_ALIMENTACAO, CODAE } from "../../../configs/constants";

const atual = {
  href: "#",
  titulo: "Relatório"
};

const anteriores = [
  {
    href: `/${CODAE}/${INCLUSAO_ALIMENTACAO}`,
    titulo: "Inclusões de Alimentação"
  }
];

export default () => (
  <Page>
    <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
    <Relatorio />
  </Page>
);
