import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Relatorio from "../../../components/SolicitacaoUnificada/DRE/Relatorio";
import {
  DRE,
  SOLICITACAO_KIT_LANCHE_UNIFICADA
} from "../../../configs/constants";
import { HOME } from "../constants";

const atual = {
  href: "#",
  titulo: "Relatório"
};

const anteriores = [
  {
    href: `/${DRE}/${SOLICITACAO_KIT_LANCHE_UNIFICADA}`,
    titulo: "Solicitações de Kit Lanche Unificada"
  }
];

export const RelatorioPage = () => (
  <Page>
    <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
    <Relatorio />
  </Page>
);
