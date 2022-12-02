import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import CadastroLaboratorio from "components/screens/Cadastros/CadastroLaboratorio";
import Page from "../../components/Shareable/Page/Page";
import { CADASTROS, CONFIGURACOES, LABORATORIO } from "../../configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${LABORATORIO}`,
  titulo: "Cadastro de Laboratórios"
};

const anteriores = [
  {
    href: `/${CONFIGURACOES}/${CADASTROS}`,
    titulo: "Cadastros"
  }
];

export default () => (
  <Page titulo={atual.titulo} botaoVoltar voltarPara={`/`}>
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <CadastroLaboratorio />
  </Page>
);
