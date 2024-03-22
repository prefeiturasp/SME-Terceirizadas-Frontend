import React from "react";

import { HOME } from "constants/config";
import {
  RECEBIMENTO,
  QUESTOES_POR_PRODUTO,
  ATRIBUIR_QUESTOES_CONFERENCIA,
} from "configs/constants";
import Page from "components/Shareable/Page/Page";
import Breadcrumb from "components/Shareable/Breadcrumb";

const atual = {
  href: `/${RECEBIMENTO}/${ATRIBUIR_QUESTOES_CONFERENCIA}`,
  titulo: "Atribuir Questões para Conferência",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Recebimento",
  },
  {
    href: `/${RECEBIMENTO}/${QUESTOES_POR_PRODUTO}`,
    titulo: "Questões por Produto",
  },
];

export default () => (
  <Page
    botaoVoltar
    voltarPara={anteriores[anteriores.length - 1].href}
    titulo={atual.titulo}
  >
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <></>
  </Page>
);
