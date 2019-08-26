import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import CadastroEmpresa from "../../components/screens/Cadastros/CadastroEmpresa/CadastroEmpresa";
import Page from "../../components/Shareable/Page/Page";

const atual = {
  href: "/configuracoes/cadastros/empresa",
  titulo: "Empresa"
};

const anteriores = [
  {
    href: "/configuracoes/cadastros",
    titulo: "Cadastros"
  }
];

export default () => (
  <Page titulo={atual.titulo}>
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <CadastroEmpresa />
  </Page>
);
