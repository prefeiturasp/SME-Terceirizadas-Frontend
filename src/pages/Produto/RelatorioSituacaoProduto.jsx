import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import RelatorioSituacaoProduto from "components/screens/Produto/RelatorioSituacaoProduto";
import Page from "components/Shareable/Page/Page";
import {
  GESTAO_PRODUTO,
  RELATORIO_SITUACAO_PRODUTO
} from "../../configs/constants";

const atual = {
  href: `/${GESTAO_PRODUTO}/${RELATORIO_SITUACAO_PRODUTO}`,
  titulo: "Relatorio de Situação do Produto"
};

export default () => (
  <Page
    titulo={"Relatório de Situação do Produto"}
    botaoVoltar
    voltarPara={"/"}
  >
    <Breadcrumb home={"/"} atual={atual} />
    <RelatorioSituacaoProduto />
  </Page>
);
