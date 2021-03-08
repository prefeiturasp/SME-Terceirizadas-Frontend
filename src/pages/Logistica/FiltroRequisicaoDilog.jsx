import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { ENVIO_REQUISICOES_ENTREGA, LOGISTICA } from "configs/constants";
import FiltroRequisicaoDilog from "components/screens/Logistica/FiltroRequisicaoDilog";

const atual = {
  href: `/${LOGISTICA}/${ENVIO_REQUISICOES_ENTREGA}`,
  titulo: "Envio de Requisições de Entrega"
};

const anteriores = [
  {
    href: `/`,
    titulo: "Logística"
  }
];

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <FiltroRequisicaoDilog />
  </Page>
);
