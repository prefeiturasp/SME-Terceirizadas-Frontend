import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Relatorio from "../../../components/SuspensaoDeAlimentacao/Terceirizada/Relatorio";
import { HOME } from "../constants";
import { TERCEIRIZADA, SUSPENSAO_ALIMENTACAO } from "../../../configs/RoutesConfig";

const atual = {
  href: "#",
  titulo: "Relatório"
};

const anteriores = [
  {
    href: `/${TERCEIRIZADA}/${SUSPENSAO_ALIMENTACAO}`,
    titulo: "Suspensões de Alimentação"
  }
];

export default () => (
  <Page>
    <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
    <Relatorio />
  </Page>
);
