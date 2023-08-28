import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { CRONOGRAMA_ENTREGA, PRE_RECEBIMENTO } from "configs/constants";
import CronogramaEntrega from "components/screens/PreRecebimento/CronogramaEntrega";

const atual = {
  href: `/${PRE_RECEBIMENTO}/${CRONOGRAMA_ENTREGA}`,
  titulo: "Cronograma de Entrega",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Pré-Recebimento",
  },
];

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <CronogramaEntrega />
  </Page>
);
