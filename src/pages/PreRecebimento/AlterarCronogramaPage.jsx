import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  ALTERACAO_CRONOGRAMA,
  CRONOGRAMA_ENTREGA,
  PRE_RECEBIMENTO,
} from "configs/constants";
import AlterarCronograma from "components/screens/PreRecebimento/AlterarCronograma";

const atual = {
  href: `/${PRE_RECEBIMENTO}/${ALTERACAO_CRONOGRAMA}`,
  titulo: "Alteração do Cronograma de Entrega",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Pré-Recebimento",
  },
  {
    href: `/${PRE_RECEBIMENTO}/${CRONOGRAMA_ENTREGA}`,
    titulo: "Cronograma de Entrega",
  },
];

export default () => (
  <Page
    botaoVoltar
    temModalVoltar
    voltarPara="/pre-recebimento/cronograma-entrega"
    titulo={atual.titulo}
  >
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <AlterarCronograma />
  </Page>
);
