import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import CadastroEmbalagem from "components/screens/Cadastros/CadastroEmbalagem";
import Page from "../../components/Shareable/Page/Page";
import { CADASTROS, CONFIGURACOES, EMBALAGEM } from "../../configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${EMBALAGEM}`,
  titulo: "Embalagens"
};

const anteriores = [
  {
    href: `/${CONFIGURACOES}/${CADASTROS}`,
    titulo: "Cadastros"
  }
];

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={"/"}>
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <CadastroEmbalagem />
  </Page>
);
