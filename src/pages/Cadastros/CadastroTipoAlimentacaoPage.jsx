import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Container from "../../components/screens/Cadastros/CadastroTipoAlimentacao/Container";
import Page from "../../components/Shareable/Page/Page";
import {
  CADASTROS,
  CONFIGURACOES,
  TIPO_ALIMENTACAO_UNIDADE_ESCOLAR
} from "../../configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${TIPO_ALIMENTACAO_UNIDADE_ESCOLAR}`,
  titulo: "Cadastro de tipo de alimentação"
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
