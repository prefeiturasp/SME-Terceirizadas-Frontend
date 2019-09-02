import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Relatorio from "../../../components/AlteracaoDeCardapio/Terceirizada/Relatorio";
import { HOME } from "../constants";
import {
  ALTERACAO_CARDAPIO,
  TERCEIRIZADA
} from "../../../configs/RoutesConfig";

const atual = {
  href: "#",
  titulo: "Relatório"
};

const anteriores = [
  {
    href: `/${TERCEIRIZADA}/${ALTERACAO_CARDAPIO}`,
    titulo: "Alterações de Cardápio"
  }
];

export default () => (
  <Page>
    <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
    <Relatorio />
  </Page>
);
