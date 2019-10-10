import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Relatorio from "../../../components/AlteracaoDeCardapio/Escola/Relatorio";
import Page from "../../../components/Shareable/Page/Page";
import { HOME } from "../constants";
import { ALTERACAO_CARDAPIO, ESCOLA } from "../../../configs/constants";

const atual = {
  href: "#",
  titulo: "Relatório"
};

const anteriores = [
  {
    href: `/${ESCOLA}/${ALTERACAO_CARDAPIO}`,
    titulo: "Alterações de Cardápio"
  }
];

export default () => (
  <Page>
    <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
    <Relatorio />
  </Page>
);