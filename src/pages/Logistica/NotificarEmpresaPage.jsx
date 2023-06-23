import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { NOTIFICAR_EMPRESA, LOGISTICA } from "configs/constants";
import NotificarEmpresa from "components/screens/Logistica/NotificarEmpresa";

const atual = {
  href: `/${LOGISTICA}/${NOTIFICAR_EMPRESA}`,
  titulo: "Notificar Empresa"
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
    <NotificarEmpresa />
  </Page>
);
