import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import {
  EMPENHOS,
  MEDICAO_INICIAL,
  ACOMPANHAMENTO_DE_LANCAMENTOS,
} from "../../configs/constants";
import { Empenhos } from "components/screens/LancamentoInicial/Empenhos";

const atual = {
  href: `/${MEDICAO_INICIAL}/${EMPENHOS}/`,
  titulo: "Empenhos",
};

const anterior = [
  {
    href: `/${MEDICAO_INICIAL}/${ACOMPANHAMENTO_DE_LANCAMENTOS}`,
    titulo: "Medição Inicial",
  },
  {
    href: "#",
    titulo: "Cadastros",
  },
];

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={"/"}>
    <Breadcrumb home={"/"} anteriores={anterior} atual={atual} />
    <Empenhos />
  </Page>
);
