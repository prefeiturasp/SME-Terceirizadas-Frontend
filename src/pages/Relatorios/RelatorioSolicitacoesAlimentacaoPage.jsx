import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { RELATORIO_SOLICITACOES_ALIMENTACAO } from "../../configs/constants";
import { RelatorioSolicitacoesAlimentacao } from "components/screens/Relatorios/SolicitacoesAlimentacao";

const atual = {
  href: `/${RELATORIO_SOLICITACOES_ALIMENTACAO}`,
  titulo: "Relatório de Solicitações de Alimentações"
};

const anteriores = [
  {
    href: `/painel-gestao-alimentacao`,
    titulo: "Gestão de Alimentação"
  },
  {
    href: `/`,
    titulo: "Relatórios"
  }
];

export default props => (
  <Page titulo={atual.titulo} botaoVoltar {...props}>
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <RelatorioSolicitacoesAlimentacao {...props} />
  </Page>
);
