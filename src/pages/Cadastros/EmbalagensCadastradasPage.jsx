import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Embalagens from "components/screens/Cadastros/Embalagens";
import Page from "../../components/Shareable/Page/Page";
import {
  CADASTROS,
  CONFIGURACOES,
  EMBALAGENS_CADASTRADAS,
} from "../../configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${EMBALAGENS_CADASTRADAS}`,
  titulo: "Embalagens",
};

const anteriores = [
  {
    href: `/${CONFIGURACOES}/${CADASTROS}`,
    titulo: "Cadastros",
  },
];

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={"/"}>
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <Embalagens />
  </Page>
);
