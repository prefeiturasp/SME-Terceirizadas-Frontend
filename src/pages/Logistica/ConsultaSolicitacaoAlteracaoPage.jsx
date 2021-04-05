import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { CONSULTA_SOLICITACAO_ALTERACAO, LOGISTICA } from "configs/constants";
import ConsultaSolicitacaoAlteracao from "components/screens/Logistica/ConsultaSolicitacaoAlteracao";

const atual = {
  href: `/${LOGISTICA}/${CONSULTA_SOLICITACAO_ALTERACAO}`,
  titulo: "Consulta Solicitacão de Alteração"
};

const anteriores = [
  {
    href: `/`,
    titulo: "Abastecimento"
  }
];

export default () => (
  <Page botaoVoltar voltarPara="/" titulo={atual.titulo}>
    <Breadcrumb home={HOME} atual={atual} anteriores={anteriores} />
    <ConsultaSolicitacaoAlteracao />
  </Page>
);
