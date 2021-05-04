import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { CONFERIR_ENTREGA, LOGISTICA } from "configs/constants";
import ConferirEntrega from "components/screens/Logistica/ConferirEntrega";

const atual = {
  href: `/${LOGISTICA}/${CONFERIR_ENTREGA}`,
  titulo: "Conferir Entrega"
};

const anteriores = [
  {
    href: `/`,
    titulo: "Abastecimento"
  }
];

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <ConferirEntrega />
  </Page>
);
