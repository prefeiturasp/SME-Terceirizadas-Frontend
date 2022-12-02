import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import LaboratoriosCadastrados from "components/screens/Cadastros/LaboratoriosCadastrados";
import Page from "../../components/Shareable/Page/Page";
import {
  CADASTROS,
  CONFIGURACOES,
  LABORATORIO,
  LABORATORIOS_CADASTRADOS
} from "../../configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${LABORATORIOS_CADASTRADOS}`,
  titulo: "Laboratórios Cadastrados"
};

const anteriores = [
  {
    href: `/${CONFIGURACOES}/${CADASTROS}`,
    titulo: "Cadastros"
  },
  {
    href: `/${CONFIGURACOES}/${CADASTROS}/${LABORATORIO}`,
    titulo: "Cadastro de Laboratórios"
  }
];

export default () => (
  <Page
    titulo={atual.titulo}
    botaoVoltar
    voltarPara={`/${CONFIGURACOES}/${CADASTROS}/${LABORATORIO}`}
  >
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <LaboratoriosCadastrados />
  </Page>
);
