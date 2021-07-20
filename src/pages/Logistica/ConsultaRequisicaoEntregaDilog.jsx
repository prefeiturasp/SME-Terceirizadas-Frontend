import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  ENVIO_REQUISICOES_ENTREGA_AVANCADO,
  LOGISTICA
} from "configs/constants";
import ConsultaRequisicaoEntregaDilog from "components/screens/Logistica/ConsultaRequisicaoEntregaDilog";

const atual = {
  href: `/${LOGISTICA}/${ENVIO_REQUISICOES_ENTREGA_AVANCADO}`,
  titulo: "Requisições de Entrega"
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
    <ConsultaRequisicaoEntregaDilog />
  </Page>
);
