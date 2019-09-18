import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Relatorio from "../../../components/SolicitacaoUnificada/DRE/Relatorio";
import Page from "../../../components/Shareable/Page/Page";
import { HOME } from "../constants";
import {
  SOLICITACAO_KIT_LANCHE_UNIFICADA,
  DRE
} from "../../../configs/constants";

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
