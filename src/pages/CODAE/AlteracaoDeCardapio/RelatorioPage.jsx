import React from "react";
import Relatorio from "../../../components/AlteracaoDeCardapio/CODAE/Relatorio";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import { ALTERACAO_CARDAPIO, CODAE } from "../../../configs/RoutesConfig";
import { HOME } from "../constants";

const atual = {
  href: "#",
  titulo: "Relatório"
};
const anteriores = [
  {
    href: `/${CODAE}/${ALTERACAO_CARDAPIO}`,
    titulo: "Alterações de Cardápio"
  }
];

export default () => (
  <Page>
    <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
    <Relatorio />
  </Page>
);
