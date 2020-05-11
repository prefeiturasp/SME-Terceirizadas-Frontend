import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import BuscaAvancada from "../../components/screens/Produto/BuscaAvancada";
import Page from "../../components/Shareable/Page/Page";
import {
  PESQUISA_DESENVOLVIMENTO,
  BUSCA_PRODUTO
} from "../../configs/constants";

const atual = {
  href: `/${PESQUISA_DESENVOLVIMENTO}/${BUSCA_PRODUTO}`,
  titulo: "Consultar Produto"
};

export default () => (
  <Page titulo={"Consultar Produto"} botaoVoltar voltarPara={"/"}>
    <Breadcrumb home={"/"} atual={atual} />
    <BuscaAvancada />
  </Page>
);
