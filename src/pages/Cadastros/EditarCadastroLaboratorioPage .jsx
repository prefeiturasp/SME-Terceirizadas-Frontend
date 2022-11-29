import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import CadastroLaboratorio from "components/screens/Cadastros/CadastroLaboratorio";
import Page from "../../components/Shareable/Page/Page";
import { CADASTROS, CONFIGURACOES } from "../../configs/constants";

const atual = {
  titulo: "Editar Cadastro de Laboratório"
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
    <CadastroLaboratorio />
  </Page>
);
