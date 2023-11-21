import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  DETALHAR_DOCUMENTO_RECEBIMENTO,
  PAINEL_DOCUMENTOS_RECEBIMENTO,
  DOCUMENTOS_RECEBIMENTO,
  PRE_RECEBIMENTO,
} from "configs/constants";
import Detalhar from "components/screens/PreRecebimento/DocumentosRecebimento/components/Detalhar";
import DetalharCodae from "components/screens/PreRecebimento/DocumentosRecebimento/components/DetalharCodae";
import { usuarioEhEmpresaFornecedor } from "helpers/utilities";

const atual = {
  href: `/${PRE_RECEBIMENTO}/${DETALHAR_DOCUMENTO_RECEBIMENTO}`,
  titulo: "Detalhar Documento de Recebimento",
};

const link = usuarioEhEmpresaFornecedor()
  ? `/${PRE_RECEBIMENTO}/${DOCUMENTOS_RECEBIMENTO}`
  : `/${PRE_RECEBIMENTO}/${PAINEL_DOCUMENTOS_RECEBIMENTO}`;

const anteriores = [
  {
    href: `/`,
    titulo: "Pré-Recebimento",
  },
  {
    href: link,
    titulo: "Documentos de Recebimento",
  },
];

export default () => (
  <Page botaoVoltar voltarPara={link} titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    {usuarioEhEmpresaFornecedor() ? <Detalhar /> : <DetalharCodae />}
  </Page>
);
