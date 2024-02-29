import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { GUIAS_NOTIFICACAO_FISCAL, LOGISTICA } from "configs/constants";
import GuiasComNotificacoes from "components/screens/Logistica/GuiasComNotificacoes";

const atual = {
  href: `/${LOGISTICA}/${GUIAS_NOTIFICACAO_FISCAL}`,
  titulo: "Notificações",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Abastecimento",
  },
  {
    href: `/`,
    titulo: "Ocorrências",
  },
];

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <GuiasComNotificacoes fiscal />
  </Page>
);
