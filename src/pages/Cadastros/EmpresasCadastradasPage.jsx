import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import EmpresasCadastradas from "../../components/screens/Cadastros/CadastroEmpresa/EmpresasCadastradas";
import Page from "../../components/Shareable/Page/Page";

const atual = {
  href: "/configuracoes/cadastros/empresas-cadastradas",
  titulo: "Empresas Cadastradas"
};

const anteriores = [
  {
    href: "/configuracoes/cadastros",
    titulo: "Cadastros"
  },
  {
    href: "/configuracoes/cadastros/empresa",
    titulo: "Empresa"
  }
];

export default () => (
  <Page
    titulo={atual.titulo}
    botaoVoltar
    voltarPara="/configuracoes/cadastros/empresa"
  >
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <EmpresasCadastradas />
  </Page>
);
