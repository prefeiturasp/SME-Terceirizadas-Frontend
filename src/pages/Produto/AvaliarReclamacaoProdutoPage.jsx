import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import {
  AVALIAR_RECLAMACAO_PRODUTO,
  GESTAO_PRODUTO
} from "../../configs/constants";
import { AvaliarReclamacaoProduto } from "components/screens/Produto/AvaliarReclamacaoProduto";

const atual = {
  href: `/${GESTAO_PRODUTO}/${AVALIAR_RECLAMACAO_PRODUTO}`,
  titulo: "Avaliar Reclamação de Produto"
};

export default () => (
  <Page titulo={"Avaliar Reclamação de Produto"}>
    <Breadcrumb home={"/"} atual={atual} />
    <AvaliarReclamacaoProduto />
  </Page>
);
