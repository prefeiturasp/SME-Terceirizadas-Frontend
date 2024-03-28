import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { MEDICAO_INICIAL, CONTROLE_DE_FREQUENCIA } from "configs/constants";
import { ControleDeFrequencia } from "components/screens/LancamentoInicial/ControleDeFrequencia";

const atual = {
  href: `/${MEDICAO_INICIAL}/${CONTROLE_DE_FREQUENCIA}`,
  titulo: "Controle de Frequência de Alunos",
};

const anterior = [
  {
    href: "#",
    titulo: "Medição Inicial",
  },
];

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={"/"}>
    <Breadcrumb home={"/"} anteriores={anterior} atual={atual} />
    <ControleDeFrequencia />
  </Page>
);
