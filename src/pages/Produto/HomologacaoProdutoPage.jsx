import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import HomologacaoProduto from "../../components/screens/Produto/Homologacao";
import Page from "../../components/Shareable/Page/Page";
import {
  PESQUISA_DESENVOLVIMENTO,
  HOMOLOGACAO_PRODUTO
} from "../../configs/constants";

const atual = {
  href: `/${PESQUISA_DESENVOLVIMENTO}/${HOMOLOGACAO_PRODUTO}`,
  titulo: "Homologação de Produto"
};

export default () => (
  <Page titulo={"Ficha de identificação de Produto"} botaoVoltar>
    <Breadcrumb home={"/"} atual={atual} />
    <HomologacaoProduto />
  </Page>
);
