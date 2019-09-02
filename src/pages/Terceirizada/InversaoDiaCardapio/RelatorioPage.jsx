import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Relatorio from "../../../components/InversaoDeDiaDeCardapio/Terceirizada/Relatorio";
import { HOME } from "../constants";
import { INVERSAO_CARDAPIO, TERCEIRIZADA } from "../../../configs/RoutesConfig";

const atual = {
  href: "#",
  titulo: "Relatório"
};

const anteriores = [
  {
    href: `/${TERCEIRIZADA}/${INVERSAO_CARDAPIO}`,
    titulo: "Inversões de dia de Cardápio"
  }
];

export default () => (
  <Page>
    <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
    <Relatorio />
  </Page>
);
