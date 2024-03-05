import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  ANALISAR_FICHA_TECNICA,
  PAINEL_FICHAS_TECNICAS,
  PRE_RECEBIMENTO,
  FICHA_TECNICA,
} from "configs/constants";
import Analisar from "components/screens/PreRecebimento/FichaTecnica/components/Analisar";
import { usuarioEhEmpresaFornecedor } from "helpers/utilities";

const atual = {
  href: `/${PRE_RECEBIMENTO}/${ANALISAR_FICHA_TECNICA}`,
  titulo: "Detalhar Ficha Técnica",
};

const link = usuarioEhEmpresaFornecedor()
  ? `/${PRE_RECEBIMENTO}/${FICHA_TECNICA}`
  : `/${PRE_RECEBIMENTO}/${PAINEL_FICHAS_TECNICAS}`;

const anteriores = [
  {
    href: `/`,
    titulo: "Pré-Recebimento",
  },
  {
    href: link,
    titulo: "Fichas Técnicas",
  },
];

export default () => (
  <Page botaoVoltar voltarPara={link} titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <Analisar somenteLeitura />
  </Page>
);
