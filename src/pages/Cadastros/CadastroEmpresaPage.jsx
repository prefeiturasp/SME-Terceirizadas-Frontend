import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import { CADASTROS, CONFIGURACOES, EMPRESA } from "../../configs/constants";
import { CadastroEmpresaRefatorada } from "components/screens/Cadastros/CadastroEmpresa/CadastroEmpresaRefatorada";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${EMPRESA}`,
  titulo: "Cadastro de Empresa"
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
    <CadastroEmpresaRefatorada />
  </Page>
);
