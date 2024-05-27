import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { MEDICAO_INICIAL, RELATORIO_FINANCEIRO } from "configs/constants";
import { RelatorioFinanceiro } from "components/screens/LancamentoInicial/RelatorioFinanceiro";

const atual = {
  href: `/${MEDICAO_INICIAL}/${RELATORIO_FINANCEIRO}`,
  titulo: "Relatório Financeiro",
};

const anterior = [
  {
    href: "#",
    titulo: "Medição Inicial",
  },
];

export const RelatorioFinanceiroPage = () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={"/"}>
    <Breadcrumb home={"/"} anteriores={anterior} atual={atual} />
    <RelatorioFinanceiro />
  </Page>
);
