import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Relatorio from "../../../components/InclusaoDeAlimentacao/Escola/Relatorio";
import Page from "../../../components/Shareable/Page/Page";
import { HOME } from "../constants";
import { INCLUSAO_ALIMENTACAO, ESCOLA } from "../../../configs/constants";

const atual = {
  href: "#",
  titulo: "Relatório"
};

const anteriores = [
  {
    href: `/${ESCOLA}/${INCLUSAO_ALIMENTACAO}`
  }
];

export const RelatorioPage = () => (
  <Page>
    <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
    <Relatorio />
  </Page>
);
