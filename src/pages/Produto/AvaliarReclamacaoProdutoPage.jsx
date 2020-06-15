import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import BuscaAvancada from "../../components/screens/Produto/BuscaAvancada";
import Page from "../../components/Shareable/Page/Page";
import {
  PESQUISA_DESENVOLVIMENTO,
  AVALIAR_RECLAMACAO_PRODUTO
} from "../../configs/constants";

const atual = {
  href: `/${PESQUISA_DESENVOLVIMENTO}/${AVALIAR_RECLAMACAO_PRODUTO}`,
  titulo: "Avaliar Reclamação de Produto"
};

export default () => (
  <Page titulo={"Avaliar Reclamação de Produto"} botaoVoltar voltarPara={"/"}>
    <Breadcrumb home={"/"} atual={atual} />
    <BuscaAvancada />
  </Page>
);
