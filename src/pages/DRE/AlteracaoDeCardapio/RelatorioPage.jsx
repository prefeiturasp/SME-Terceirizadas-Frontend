import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Relatorio from "../../../components/AlteracaoDeCardapio/DRE/Relatorio";
import { HOME } from "../constants";
import { DRE, ALTERACAO_CARDAPIO } from "../../../configs/constants";

const atual = {
  href: "#",
  titulo: "Relatório"
};

const anteriores = [
  {
    href: `/${DRE}/${ALTERACAO_CARDAPIO}`,
    titulo: "Alterações de Cardápio"
  }
];

export default () => (
  <Page>
    <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
    <Relatorio />
  </Page>
);
