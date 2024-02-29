import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import { ConsultaEditaisContratos } from "components/screens/Cadastros/EditaisContratosRefatorado/ConsultaEditaisContratos";
import Page from "components/Shareable/Page/Page";
import {
  CONFIGURACOES,
  CADASTROS,
  EDITAIS_CONTRATOS,
  EDITAIS_CADASTRADOS,
} from "configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${EDITAIS_CADASTRADOS}`,
  titulo: "Editais e Contratos Cadastrados",
};

const anteriores = [
  {
    href: `/${CONFIGURACOES}/${CADASTROS}`,
    titulo: "Cadastros",
  },
  {
    href: `/${CONFIGURACOES}/${CADASTROS}/${EDITAIS_CONTRATOS}`,
    titulo: "Editais e Contratos",
  },
];

export default () => (
  <Page titulo={atual.titulo} botaoVoltar>
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <ConsultaEditaisContratos />
  </Page>
);
