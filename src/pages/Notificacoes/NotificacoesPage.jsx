import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { NOTIFICACOES } from "configs/constants";
import Notificacoes from "components/screens/Notificacoes";

const atual = {
  href: `/${NOTIFICACOES}`,
  titulo: "Notificações"
};

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} />
    <Notificacoes />
  </Page>
);
