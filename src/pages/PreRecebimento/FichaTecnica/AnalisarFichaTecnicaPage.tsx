import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  ANALISE_FICHA_TECNICA,
  PAINEL_FICHAS_TECNICAS,
  PRE_RECEBIMENTO,
} from "configs/constants";
import Analisar from "components/screens/PreRecebimento/FichaTecnica/components/Analisar";
import { usuarioEhCODAEGabinete } from "helpers/utilities";

const atual = {
  href: `/${PRE_RECEBIMENTO}/${ANALISE_FICHA_TECNICA}`,
  titulo: "Analisar Ficha Técnica",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Pré-Recebimento",
  },
  {
    href: `/${PRE_RECEBIMENTO}/${PAINEL_FICHAS_TECNICAS}`,
    titulo: "Fichas Técnicas",
  },
];
const somenteLeitura = usuarioEhCODAEGabinete() ? true : false;

export default () => (
  <Page
    botaoVoltar
    voltarPara={`/${PRE_RECEBIMENTO}/${PAINEL_FICHAS_TECNICAS}`}
    titulo={atual.titulo}
  >
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <Analisar somenteLeitura={somenteLeitura} />
  </Page>
);
