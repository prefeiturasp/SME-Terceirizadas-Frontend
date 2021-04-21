import React from "react";

import { HOME } from "constants/config";

import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";

import CadastroProtocoloPadraoDietaEsp from "components/screens/DietaEspecial/CadastroProtocoloPadraoDietaEsp";
import { DIETA_ESPECIAL, PROTOCOLO_PADRAO_DIETA } from "configs/constants";

const atual = {
  href: `/${DIETA_ESPECIAL}/${PROTOCOLO_PADRAO_DIETA}`,
  titulo: "Cadastro de Protocolo Padrão de Dieta Especial"
};

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} />
    <CadastroProtocoloPadraoDietaEsp />
  </Page>
);
