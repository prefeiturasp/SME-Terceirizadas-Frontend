import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  DETALHAR_DOCUMENTO_RECEBIMENTO,
  DOCUMENTOS_RECEBIMENTO,
  PRE_RECEBIMENTO,
} from "configs/constants";
import Detalhar from "components/screens/PreRecebimento/DocumentosRecebimento/components/Detalhar";

const atual = {
  href: `/${PRE_RECEBIMENTO}/${DETALHAR_DOCUMENTO_RECEBIMENTO}`,
  titulo: "Detalhar Documento de Recebimento",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Pré-Recebimento",
  },
  {
    href: `/${PRE_RECEBIMENTO}/${DOCUMENTOS_RECEBIMENTO}`,
    titulo: "Documentos de Recebimento",
  },
];

export default () => (
  <Page
    botaoVoltar
    voltarPara={`/${PRE_RECEBIMENTO}/${DOCUMENTOS_RECEBIMENTO}`}
    titulo={atual.titulo}
  >
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />

    <Detalhar />
  </Page>
);
