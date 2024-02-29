import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { CADASTRO_NOTIFICACAO, LOGISTICA } from "configs/constants";
import CadastroNotificacao from "components/screens/Logistica/CadastroNotificacao";

const atual = {
  href: `/${LOGISTICA}/${CADASTRO_NOTIFICACAO}`,
  titulo: "Nova Notificação",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Abastecimento",
  },
];

export default () => (
  <Page botaoVoltar titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <CadastroNotificacao />
  </Page>
);
