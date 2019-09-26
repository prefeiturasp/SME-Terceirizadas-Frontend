import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Container from "../../components/screens/Cadastros/CadastroLote/Container";
import Page from "../../components/Shareable/Page/Page";
import { CADASTROS, CONFIGURACOES, LOTE } from "../../configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${LOTE}`,
  titulo: "Cadastro de Lote"
};

const anteriores = [
  {
    href: `/${CONFIGURACOES}/${CADASTROS}`,
    titulo: "Cadastros"
  }
];

export default () => (
  <Page
    titulo={atual.titulo}
    botaoVoltar
    voltarPara={`/${CONFIGURACOES}/${CADASTROS}`}
  >
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <Container />
  </Page>
);
