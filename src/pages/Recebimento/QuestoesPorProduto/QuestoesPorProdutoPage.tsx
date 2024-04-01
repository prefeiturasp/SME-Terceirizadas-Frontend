import React from "react";

import { HOME } from "constants/config";
import { RECEBIMENTO, QUESTOES_POR_PRODUTO } from "configs/constants";
import Page from "components/Shareable/Page/Page";
import Breadcrumb from "components/Shareable/Breadcrumb";
import QuestoesPorProduto from "components/screens/Recebimento/QuestoesPorProduto";

const atual = {
  href: `/${RECEBIMENTO}/${QUESTOES_POR_PRODUTO}`,
  titulo: "Questões por Produto",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Recebimento",
  },
];

export default () => (
  <Page
    botaoVoltar
    voltarPara={anteriores[anteriores.length - 1].href}
    titulo={atual.titulo}
  >
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <QuestoesPorProduto />
  </Page>
);
