import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { GESTAO_SOLICITACAO_ALTERACAO, LOGISTICA } from "configs/constants";
import GestaoSolicitacaoAlteracao from "components/screens/Logistica/GestaoSolicitacaoAlteracao";

const atual = {
  href: `/${LOGISTICA}/${GESTAO_SOLICITACAO_ALTERACAO}`,
  titulo: "Solicitacão de Alteração"
};

const anteriores = [
  {
    href: `/`,
    titulo: "Logística"
  }
];

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <GestaoSolicitacaoAlteracao />
  </Page>
);
