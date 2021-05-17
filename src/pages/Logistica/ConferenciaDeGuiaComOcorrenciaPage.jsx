import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  CONFERIR_ENTREGA,
  CONFERENCIA_GUIA_COM_OCORRENCIA,
  LOGISTICA
} from "configs/constants";
import ConferenciaDeGuiaComOcorrencia from "components/screens/Logistica/ConferenciaDeGuiaComOcorrencia";

const atual = {
  href: `/${LOGISTICA}/${CONFERENCIA_GUIA_COM_OCORRENCIA}`,
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
  <Page
    botaoVoltar
    voltarPara={`/${LOGISTICA}/${CONFERIR_ENTREGA}`}
    titulo={atual.titulo}
  >
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <ConferenciaDeGuiaComOcorrencia />
  </Page>
);
