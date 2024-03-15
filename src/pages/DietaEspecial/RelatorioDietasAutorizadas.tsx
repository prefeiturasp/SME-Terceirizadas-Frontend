import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import {
  DIETA_ESPECIAL,
  RELATORIO_DIETAS_AUTORIZADAS,
} from "../../configs/constants";
import { RelatorioDietasAutorizadas } from "components/screens/DietaEspecial/RelatorioDietasAutorizadas";

const atual = {
  href: `/${DIETA_ESPECIAL}/${RELATORIO_DIETAS_AUTORIZADAS}/`,
  titulo: "Relatório de Dietas Autorizadas",
};

const anteriores = [
  {
    href: "#",
    titulo: "Dieta Especial",
  },
  {
    href: "#",
    titulo: "Relatórios",
  },
];

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={"/"}>
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <RelatorioDietasAutorizadas />
  </Page>
);
