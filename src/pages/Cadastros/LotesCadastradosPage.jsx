import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import LotesCadastrados from "../../components/screens/Cadastros/CadastroLote/components/LotesCadastrados";
import Page from "../../components/Shareable/Page/Page";

const atual = {
  href: "/configuracoes/cadastros/lotes-cadastrados",
  titulo: "Lotes Cadastrados"
};

const anteriores = [
  {
    href: "/configuracoes/cadastros",
    titulo: "Cadastros"
  },
  {
    href: "/configuracoes/cadastros/lote",
    titulo: "Lote"
  }
];

export default () => (
  <Page titulo={atual.titulo}>
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <LotesCadastrados />
  </Page>
);
