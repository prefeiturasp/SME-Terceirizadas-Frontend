import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Relatorio from "../../components/SolicitacaoDeKitLanche/Terceirizada/Relatorio";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "./constants";
import { TERCEIRIZADA, SOLICITACAO_KIT_LANCHE } from "../../configs/RoutesConfig";

const atual = {
  href: "#",
  titulo: "Relatório"
};

const anteriores = [
  {
    href: `/${TERCEIRIZADA}/${SOLICITACAO_KIT_LANCHE}`,
    titulo: "Solicitações de Kit Lanche"
  }
]

export default props => (
  <Page tituloRastro="solicitações">
    <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
    <Relatorio />
  </Page>
);
