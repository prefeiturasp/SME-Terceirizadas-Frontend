import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  LAYOUT_EMBALAGEM,
  PRE_RECEBIMENTO,
  CORRIGR_LAYOUT_EMBALAGEM,
} from "configs/constants";
import Corrigir from "../../components/screens/PreRecebimento/LayoutEmbalagem/components/Corrigir";

const atual = {
  href: `/${PRE_RECEBIMENTO}/${LAYOUT_EMBALAGEM}/${CORRIGR_LAYOUT_EMBALAGEM}`,
  titulo: "Corrigir Layout de Embalagem",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Pré-Recebimento",
  },
  {
    href: `/${PRE_RECEBIMENTO}/${LAYOUT_EMBALAGEM}`,
    titulo: "Layout de Embalagem",
  },
];

const voltarPara = `/${PRE_RECEBIMENTO}/${LAYOUT_EMBALAGEM}`;

export default () => (
  <Page botaoVoltar voltarPara={voltarPara} titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <Corrigir />
  </Page>
);
