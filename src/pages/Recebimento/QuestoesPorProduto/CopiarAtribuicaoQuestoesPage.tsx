import React from "react";

import { HOME } from "constants/config";
import {
  RECEBIMENTO,
  QUESTOES_POR_PRODUTO,
  COPIAR_ATRIBUICAO_QUESTOES_CONFERENCIA,
} from "configs/constants";
import Page from "components/Shareable/Page/Page";
import Breadcrumb from "components/Shareable/Breadcrumb";
import AtribuirQuestoes from "components/screens/Recebimento/QuestoesPorProduto/AtribuirQuestoes";

const atual = {
  href: `/${RECEBIMENTO}/${COPIAR_ATRIBUICAO_QUESTOES_CONFERENCIA}`,
  titulo: "Copiar Questões para Conferência",
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
    <AtribuirQuestoes />
  </Page>
);
