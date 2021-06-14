import React from "react";

import { HOME } from "constants/config";

import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";

import ConsultaCadastroProtocoloPadraoDieta from "components/screens/DietaEspecial/ConsultaProtocoloPadraoDieta";
import {
  DIETA_ESPECIAL,
  CONSULTA_PROTOCOLO_PADRAO_DIETA
} from "configs/constants";

const atual = {
  href: `/${DIETA_ESPECIAL}/${CONSULTA_PROTOCOLO_PADRAO_DIETA}`,
  titulo: "Consultar Protocolo Padrão"
};

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} />
    <ConsultaCadastroProtocoloPadraoDieta />
  </Page>
);
