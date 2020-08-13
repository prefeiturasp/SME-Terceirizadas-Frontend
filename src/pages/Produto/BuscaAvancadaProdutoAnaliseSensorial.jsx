import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import BuscaAvancadaProdutoAnaliseSensorial from "../../components/screens/Produto/BuscaAvancadaProdutoAnaliseSensorial";
import Page from "../../components/Shareable/Page/Page";
import {
  GESTAO_PRODUTO,
  RELATORIO_ANALISE_SENSORIAL
} from "../../configs/constants";

const atual = {
  href: `/${GESTAO_PRODUTO}/${RELATORIO_ANALISE_SENSORIAL}`,
  titulo: "Relatório de produtos em análise sensorial"
};

export default () => (
  <Page
    titulo={"Relatório de produtos em análise sensorial"}
    botaoVoltar
    voltarPara={"/"}
  >
    <Breadcrumb home={"/"} atual={atual} />
    <BuscaAvancadaProdutoAnaliseSensorial />
  </Page>
);
