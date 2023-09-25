import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { LAYOUT_EMBALAGEM, PRE_RECEBIMENTO } from "configs/constants";
import LayoutEmbalagem from "components/screens/PreRecebimento/LayoutEmbalagem";

const atual = {
  href: `/${PRE_RECEBIMENTO}/${LAYOUT_EMBALAGEM}`,
  titulo: "Layout de Embalagem",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Pré-Recebimento",
  },
];

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <LayoutEmbalagem />
  </Page>
);
