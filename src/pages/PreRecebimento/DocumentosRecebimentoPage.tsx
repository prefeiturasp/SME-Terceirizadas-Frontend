import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { DOCUMENTOS_RECEBIMENTO, PRE_RECEBIMENTO } from "configs/constants";
import DocumentosRecebimento from "components/screens/PreRecebimento/DocumentosRecebimento";

const atual = {
  href: `/${PRE_RECEBIMENTO}/${DOCUMENTOS_RECEBIMENTO}`,
  titulo: "Documentos de Recebimento",
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
    <DocumentosRecebimento />
  </Page>
);
