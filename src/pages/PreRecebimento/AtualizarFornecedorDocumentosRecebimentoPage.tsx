import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  ATUALIZAR_FORNECEDOR_DOCUMENTO_RECEBIMENTO,
  PAINEL_DOCUMENTOS_RECEBIMENTO,
  DOCUMENTOS_RECEBIMENTO,
  PRE_RECEBIMENTO,
} from "configs/constants";
import AtualizarDocumentos from "components/screens/PreRecebimento/DocumentosRecebimento/components/AtualizarDocumentos";
import { usuarioEhEmpresaFornecedor } from "helpers/utilities";

const atual = {
  href: `/${PRE_RECEBIMENTO}/${ATUALIZAR_FORNECEDOR_DOCUMENTO_RECEBIMENTO}`,
  titulo: "Atualizar Documento de Recebimento",
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
    <AtualizarDocumentos />
  </Page>
);
