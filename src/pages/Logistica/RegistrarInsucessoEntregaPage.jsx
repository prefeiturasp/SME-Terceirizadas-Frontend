import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  INSUCESSO_ENTREGA,
  REGISTRAR_INSUCESSO,
  LOGISTICA
} from "configs/constants";
import RegistrarInsucessoEntrega from "components/screens/Logistica/RegistrarInsucessoEntrega";

const atual = {
  href: `/${LOGISTICA}/${REGISTRAR_INSUCESSO}`,
  titulo: "Registrar Insucesso de Entrega"
};

const anteriores = [
  {
    href: `/`,
    titulo: "Abastecimento"
  },
  {
    href: `/${LOGISTICA}/${INSUCESSO_ENTREGA}`,
    titulo: "Insucesso de Entrega"
  }
];

export default () => (
  <Page
    botaoVoltar
    voltarPara={`/${LOGISTICA}/${INSUCESSO_ENTREGA}`}
    titulo={atual.titulo}
  >
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <RegistrarInsucessoEntrega />
  </Page>
);
