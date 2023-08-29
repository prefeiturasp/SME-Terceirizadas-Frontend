import React from "react";
import { HOME } from "constants/config";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import { PAINEL_APROVACOES, PRE_RECEBIMENTO } from "configs/constants";
import PainelAprovacoes from "components/screens/PreRecebimento/PainelAprovacoes";

const atual = {
  href: `/${PRE_RECEBIMENTO}/${PAINEL_APROVACOES}`,
  titulo: "Painel de Aprovações",
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
    <PainelAprovacoes />
  </Page>
);
