import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import CadastroProduto from "../../components/screens/Produto/Cadastro";
import Page from "../../components/Shareable/Page/Page";
import { PESQUISA_DESENVOLVIMENTO, PRODUTO } from "../../configs/constants";

const atual = {
  href: `/${PESQUISA_DESENVOLVIMENTO}/${PRODUTO}`,
  titulo: "Cadastro de Produto"
};

export default () => (
  <Page
    titulo={"Ficha de identificação de Produto"}
    botaoVoltar
    voltarPara={"/"}
  >
    <Breadcrumb home={"/"} atual={atual} />
    <CadastroProduto />
  </Page>
);
