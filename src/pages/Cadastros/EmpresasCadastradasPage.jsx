import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import EmpresasCadastradas from "../../components/screens/Cadastros/CadastroEmpresa/EmpresasCadastradas";
import Page from "../../components/Shareable/Page/Page";
import {
  CADASTROS,
  CONFIGURACOES,
  EMPRESA,
  EMPRESAS_CADASTRADAS
} from "../../configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${EMPRESAS_CADASTRADAS}`,
  titulo: "Empresas Cadastradas"
};

const anteriores = [
  {
    href: `/${CONFIGURACOES}/${CADASTROS}`,
    titulo: "Cadastros"
  },
  {
    href: `/${CONFIGURACOES}/${CADASTROS}/${EMPRESA}`,
    titulo: "Empresa"
  }
];

export default () => (
  <Page
    titulo={atual.titulo}
    botaoVoltar
    voltarPara={`/${CONFIGURACOES}/${CADASTROS}/${EMPRESA}`}
  >
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <EmpresasCadastradas />
  </Page>
);
