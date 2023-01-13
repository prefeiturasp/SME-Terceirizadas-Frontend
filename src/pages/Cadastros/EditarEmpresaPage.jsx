import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import CadastroEmpresa from "../../components/screens/Cadastros/CadastroEmpresa/CadastroEmpresa";
import Page from "../../components/Shareable/Page/Page";
import {
  CADASTROS,
  CONFIGURACOES,
  EDITAR_EMPRESA,
  EMPRESAS_CADASTRADAS
} from "../../configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${EDITAR_EMPRESA}`,
  titulo: "Editar Cadastro de Empresa"
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
    voltarPara={`/${CONFIGURACOES}/${CADASTROS}/${EMPRESAS_CADASTRADAS}`}
  >
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <CadastroEmpresa />
  </Page>
);
