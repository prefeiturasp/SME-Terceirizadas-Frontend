import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import EditaisCadastrados from "../../components/screens/Cadastros/EditaisContratos/EditaisCadastrados";
import Page from "../../components/Shareable/Page/Page";
import {
  CONFIGURACOES,
  CADASTROS,
  EDITAIS_CONTRATOS,
  EDITAIS_CADASTRADOS
} from "../../configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${EDITAIS_CADASTRADOS}`,
  titulo: "Editais e Contratos Cadastrados"
};

const anteriores = [
  {
    href: `/${CONFIGURACOES}/${CADASTROS}`,
    titulo: "Cadastros"
  },
  {
    href: `/${CONFIGURACOES}/${CADASTROS}/${EDITAIS_CONTRATOS}`,
    titulo: "Editais e Contratos"
  }
];

export default () => (
  <Page
    titulo={atual.titulo}
    botaoVoltar
    voltarPara={`/${CONFIGURACOES}/${CADASTROS}/${EDITAIS_CONTRATOS}`}
  >
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <EditaisCadastrados />
  </Page>
);
