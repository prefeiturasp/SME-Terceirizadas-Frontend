import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Relatorio from "../../../components/SolicitacaoUnificada/Terceirizada/Relatorio";
import { HOME } from "../constants";
import { TERCEIRIZADA, SOLICITACAO_KIT_LANCHE_UNIFICADA } from "../../../configs/constants";

const atual = {
  href: "#",
  titulo: "Relatório"
};

const anteriores = [
  {
    href: `/${TERCEIRIZADA}/${SOLICITACAO_KIT_LANCHE_UNIFICADA}`,
    titulo: "Solicitações Unificadas"
  }
];

export default () => (
  <Page>
    <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
    <Relatorio />
  </Page>
);
