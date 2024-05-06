import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import {
  SOLICITACAO_ALTERACAO_CRONOGRAMA_FORNECEDOR,
  PRE_RECEBIMENTO,
} from "configs/constants";
import SolicitacaoAlteracaoCronograma from "components/screens/PreRecebimento/SolicitacaoAlteracaoCronograma";

const atual = {
  href: `/${PRE_RECEBIMENTO}/${SOLICITACAO_ALTERACAO_CRONOGRAMA_FORNECEDOR}`,
  titulo: "Verificar Alterações de Cronograma",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Pré-Recebimento",
  },
];

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <SolicitacaoAlteracaoCronograma fornecedor />
  </Page>
);
