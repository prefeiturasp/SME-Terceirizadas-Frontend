import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import ReclamacaoProduto from "../../components/screens/Produto/Reclamacao";
import Page from "../../components/Shareable/Page/Page";
import {
  PESQUISA_DESENVOLVIMENTO,
  RECLAMACAO_DE_PRODUTO
} from "../../configs/constants";

const atual = {
  href: `/${PESQUISA_DESENVOLVIMENTO}/${RECLAMACAO_DE_PRODUTO}`,
  titulo: "Reclamação de Produto"
};

export default () => (
  <Page titulo={"Reclamação de Produto"} botaoVoltar voltarPara="/">
    <Breadcrumb home={"/"} atual={atual} />
    <ReclamacaoProduto />
  </Page>
);
