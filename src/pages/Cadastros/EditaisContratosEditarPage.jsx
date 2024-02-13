import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import { EditaisContratosRefatorado } from "components/screens/Cadastros/EditaisContratosRefatorado/Cadastro";
import Page from "components/Shareable/Page/Page";
import {
  CONFIGURACOES,
  CADASTROS,
  EDITAIS_CADASTRADOS,
  EDITAIS_CONTRATOS,
  EDITAR,
} from "configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${EDITAIS_CADASTRADOS}/${EDITAR}`,
  titulo: "Editais e Contratos - Edição",
};

const anteriores = [
  {
    href: `/${CONFIGURACOES}/${CADASTROS}`,
    titulo: "Cadastros",
  },
  {
    href: `/${CONFIGURACOES}/${CADASTROS}/${EDITAIS_CONTRATOS}`,
    titulo: "Cadastros Editais e Contratos",
  },
  {
    href: `/${CONFIGURACOES}/${CADASTROS}/${EDITAIS_CADASTRADOS}`,
    titulo: "Editais e Contratos Cadastrados",
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
