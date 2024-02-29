import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import { EditaisContratosRefatorado } from "components/screens/Cadastros/EditaisContratosRefatorado/Cadastro";
import Page from "components/Shareable/Page/Page";
import {
  CONFIGURACOES,
  CADASTROS,
  EDITAIS_CADASTRADOS,
} from "configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${EDITAIS_CADASTRADOS}`,
  titulo: "Editais e Contratos",
};

const anteriores = [
  {
    href: `/${CONFIGURACOES}/${CADASTROS}`,
    titulo: "Cadastros",
  },
];

export default () => (
  <Page
    titulo={atual.titulo}
    botaoVoltar
    voltarPara={`/${CONFIGURACOES}/${CADASTROS}`}
  >
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <EditaisContratosRefatorado />
  </Page>
);
