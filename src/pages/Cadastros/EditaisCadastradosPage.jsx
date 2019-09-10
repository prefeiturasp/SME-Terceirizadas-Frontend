import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import EditaisCadastrados from "../../components/screens/Cadastros/EditaisContratos/EditaisCadastrados";
import Page from "../../components/Shareable/Page/Page";

const atual = {
  href: "/configuracoes/cadastros/editais-cadastrados",
  titulo: "Editais e Contratos Cadastrados"
};

const anteriores = [
  {
    href: "/configuracoes/cadastros",
    titulo: "Cadastros"
  },
  {
    href: "/configuracoes/cadastros/editais-contratos",
    titulo: "Editais e Contratos"
  }
];

export default () => (
  <Page titulo={atual.titulo}>
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <EditaisCadastrados />
  </Page>
);
