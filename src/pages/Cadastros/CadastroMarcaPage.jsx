import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import CadastroGeral from "components/screens/Cadastros/CadastroGeral";
import Page from "components/Shareable/Page/Page";
import { CADASTROS, CONFIGURACOES, MARCAS } from "configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${MARCAS}`,
  titulo: "Marcas",
};

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={`/`}>
    <Breadcrumb home={"/"} atual={atual} />
    <CadastroGeral tipoFixo={"MARCA"} />
  </Page>
);
