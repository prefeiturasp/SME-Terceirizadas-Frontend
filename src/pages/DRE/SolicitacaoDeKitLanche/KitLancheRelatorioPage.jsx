import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Relatorio from "../../../components/SolicitacaoDeKitLanche/DRE/Relatorio";
import Page from "../../../components/Shareable/Page/Page";
import { HOME } from "../constants";

const atual = {
  href: "#",
  titulo: "Relatório"
};

const anteriores = [
  {
    href: "/dre/kits-lanche",
    titulo: "Solicitações de Kit Lanche"
  }
];

export default () => (
  <Page>
    <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
    <Relatorio />
  </Page>
);
