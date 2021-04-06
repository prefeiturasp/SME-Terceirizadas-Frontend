import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { DISPONIBILIZACAO_DE_SOLICITACOES, LOGISTICA } from "configs/constants";
import { DisponibilizacaoDeSolicitacoes } from "components/screens/Logistica/DisponibilizacaoDeSolicitacoes";

const atual = {
  href: `/${LOGISTICA}/${DISPONIBILIZACAO_DE_SOLICITACOES}`,
  titulo: "Disponibilização de Solicitações"
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
    <DisponibilizacaoDeSolicitacoes />
  </Page>
);
