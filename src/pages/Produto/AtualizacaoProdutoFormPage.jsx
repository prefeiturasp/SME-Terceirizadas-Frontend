import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import AtualizacaoProdutoForm from "../../components/screens/Produto/AtualizacaoProdutoForm";
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
  <Page
    titulo={"Ficha de identificação de Produto"}
    botaoVoltar
    voltarPara={"/"}
  >
    <Breadcrumb home={"/"} atual={atual} />
    <AtualizacaoProdutoForm />
  </Page>
);
