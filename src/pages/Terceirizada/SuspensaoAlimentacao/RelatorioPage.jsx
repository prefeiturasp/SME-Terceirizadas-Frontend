import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Relatorio from "../../../components/SuspensaoDeAlimentacao/Relatorio";
import { HOME } from "../constants";

const atual = {
  href: "#",
  titulo: "Relatório"
};

export default () => (
  <Page>
    <Breadcrumb home={HOME} atual={atual} />
    <Relatorio />
  </Page>
);
