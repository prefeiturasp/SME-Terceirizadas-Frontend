import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Relatorio from "../../components/SolicitacaoDeKitLanche/CODAE/Relatorio";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "./constants";
import { CODAE, SOLICITACAO_KIT_LANCHE } from "../../configs/RoutesConfig";

const atual = {
  href: "#",
  titulo: "Relatório"
};

const anteriores = [
  {
    href: `/${CODAE}/${SOLICITACAO_KIT_LANCHE}`,
    titulo: "Solicitações de Kit Lanche"
  }
]

export default props => (
  <Page tituloRastro="solicitações">
    <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
    <Relatorio />
  </Page>
);
