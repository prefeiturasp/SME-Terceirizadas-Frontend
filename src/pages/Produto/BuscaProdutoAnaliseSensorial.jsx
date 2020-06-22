import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import BuscaProdutoAnaliseSensorial from "../../components/screens/Produto/BuscaProdutoAnaliseSensorial";
import Page from "../../components/Shareable/Page/Page";
import {
  PESQUISA_DESENVOLVIMENTO,
  BUSCA_PRODUTO_ANALISE_SENSORIAL
} from "../../configs/constants";

const atual = {
  href: `/${PESQUISA_DESENVOLVIMENTO}/${BUSCA_PRODUTO_ANALISE_SENSORIAL}`,
  titulo: "Responder análise sensorial"
};

export default () => (
  <Page titulo={"Responder análise sensorial"}>
    <Breadcrumb home={"/"} atual={atual} />
    <BuscaProdutoAnaliseSensorial />
  </Page>
);
