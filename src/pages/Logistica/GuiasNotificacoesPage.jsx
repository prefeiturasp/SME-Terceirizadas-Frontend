import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { GUIAS_NOTIFICACAO, LOGISTICA } from "configs/constants";
import GuiasComNotificacoes from "components/screens/Logistica/GuiasComNotificacoes";

const atual = {
  href: `/${LOGISTICA}/${GUIAS_NOTIFICACAO}`,
  titulo: "Guias com Notificações"
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
    <GuiasComNotificacoes />
  </Page>
);
