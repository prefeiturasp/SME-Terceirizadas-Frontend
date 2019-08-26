import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Relatorio from "../../components/SolicitacaoDeKitLanche/CODAE/Relatorio";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "./constants";

const atual = {
  href: "#",
  titulo: "Relatório"
};

const anteriores = [
  {
    href: "/codae/kits-lanche",
    titulo: "Solicitações de Kit Lanche"
  }
]

export default props => (
  <Page tituloRastro="solicitações">
    <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
    <Relatorio />
  </Page>
);
