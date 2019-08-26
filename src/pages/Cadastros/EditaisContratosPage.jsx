import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import EditaisContratos from "../../components/screens/Cadastros/EditaisContratos/EditaisContratos";
import Page from "../../components/Shareable/Page/Page";

const atual = {
  href: "/configuracoes/cadastros/editais-cadastrados",
  titulo: "Editais e Contratos"
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
    <EditaisContratos />
  </Page>
);
