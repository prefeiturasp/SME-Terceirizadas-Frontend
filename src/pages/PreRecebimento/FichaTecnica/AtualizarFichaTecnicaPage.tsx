import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  ATUALIZAR_FICHA_TECNICA,
  PAINEL_FICHAS_TECNICAS,
  PRE_RECEBIMENTO,
} from "configs/constants";
import Atualizar from "components/screens/PreRecebimento/FichaTecnica/components/Atualizar";

const atual = {
  href: `/${PRE_RECEBIMENTO}/${ATUALIZAR_FICHA_TECNICA}`,
  titulo: "Atualizar Ficha Técnica",
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

export default () => (
  <Page
    botaoVoltar
    voltarPara={`/${PRE_RECEBIMENTO}/${PAINEL_FICHAS_TECNICAS}`}
    titulo={atual.titulo}
  >
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <Atualizar />
  </Page>
);
