import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { DETALHE_CRONOGRAMA, PRE_RECEBIMENTO } from "configs/constants";
import DetalharCronograma from "components/screens/PreRecebimento/CronogramaEntrega/components/DetalharCronograma";

const atual = {
  href: `/${PRE_RECEBIMENTO}/${DETALHE_CRONOGRAMA}`,
  titulo: "Detalhamento do Cronograma de Entrega"
};

const anteriores = [
  {
    href: `/`,
    titulo: "Pré-Recebimento"
  }
];

export default () => (
  <Page
    botaoVoltar
    voltarPara="/pre-recebimento/cronograma-entrega"
    titulo={atual.titulo}
  >
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <DetalharCronograma />
  </Page>
);
