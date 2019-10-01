import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Relatorio from "../../../components/InversaoDeDiaDeCardapio/Escola/Relatorio";
import Page from "../../../components/Shareable/Page/Page";
import { HOME } from "../constants";
import { INVERSAO_CARDAPIO, ESCOLA } from "../../../configs/constants";

const atual = {
  href: "#",
  titulo: "Relatório"
};

const anteriores = [
  {
    href: `/${ESCOLA}/${INVERSAO_CARDAPIO}`,
    titulo: "Solicitações de Inversao de Dia do Cardapio"
  }
];

export const RelatorioPage = () => (
  <Page>
    <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
    <Relatorio />
  </Page>
);
