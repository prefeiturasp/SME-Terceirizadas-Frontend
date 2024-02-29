import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { EDITAR_NOTIFICACAO, LOGISTICA } from "configs/constants";
import CadastroNotificacao from "components/screens/Logistica/CadastroNotificacao";

const atual = {
  href: `/${LOGISTICA}/${EDITAR_NOTIFICACAO}`,
  titulo: "Edição da Notificação",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Abastecimento",
  },
];

export default () => (
  <Page botaoVoltar titulo="Edição da Notificação">
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <CadastroNotificacao />
  </Page>
);
