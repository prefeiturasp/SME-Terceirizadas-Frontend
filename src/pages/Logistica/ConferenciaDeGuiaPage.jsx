import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  CONFERIR_ENTREGA,
  CONFERENCIA_GUIA,
  LOGISTICA
} from "configs/constants";
import ConferenciaDeGuia from "components/screens/Logistica/ConferenciaDeGuia";

const atual = {
  href: `/${LOGISTICA}/${CONFERENCIA_GUIA}`,
  titulo: "Conferência da Guia de Remessa"
};

const anteriores = [
  {
    href: `/`,
    titulo: "Abastecimento"
  },
  {
    href: `/${LOGISTICA}/${CONFERIR_ENTREGA}`,
    titulo: "Conferir Entrega"
  }
];

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <ConferenciaDeGuia />
  </Page>
);
