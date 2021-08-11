import React from "react";
import Breadcrumb from "../../../components/Shareable/Breadcrumb";
import Page from "../../../components/Shareable/Page/Page";
import Relatorio from "../../../components/AlteracaoDeCardapio/Terceirizada/Relatorio";
import { HOME } from "../constants";
import {
  ALTERACAO_TIPO_ALIMENTACAO,
  TERCEIRIZADA
} from "../../../configs/constants";

const atual = {
  href: "#",
  titulo: "Relatório"
};

const anteriores = [
  {
    href: `/${TERCEIRIZADA}/${ALTERACAO_TIPO_ALIMENTACAO}`,
    titulo: "Alterações de Cardápio"
  }
];

export default () => (
  <Page>
    <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
    <Relatorio />
  </Page>
);
