import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { RELATORIO_CRONOGRAMA, PRE_RECEBIMENTO } from "configs/constants";
import RelatorioCronograma from "components/screens/PreRecebimento/Relatorios/RelatorioCronograma";

const atual = {
  href: `/${PRE_RECEBIMENTO}/${RELATORIO_CRONOGRAMA}`,
  titulo: "Relatório de Cronogramas de Entregas",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Pré-Recebimento",
  },
  {
    href: `/`,
    titulo: "Relatórios",
  },
];

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <RelatorioCronograma />
  </Page>
);
