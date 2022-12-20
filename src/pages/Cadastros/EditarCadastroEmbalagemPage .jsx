import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import CadastroEmbalagem from "components/screens/Cadastros/CadastroEmbalagem";
import Page from "../../components/Shareable/Page/Page";
import {
  CADASTROS,
  CONFIGURACOES,
  EMBALAGEM,
  EMBALAGENS_CADASTRADAS
} from "../../configs/constants";

const atual = {
  titulo: "Editar Cadastro de Embalagem"
};

const anteriores = [
  {
    href: `/${CONFIGURACOES}/${CADASTROS}`,
    titulo: "Cadastros"
  },
  {
    href: `/${CONFIGURACOES}/${CADASTROS}/${EMBALAGEM}`,
    titulo: "Cadastro de Embalagens"
  },
  {
    href: `/${CONFIGURACOES}/${CADASTROS}/${EMBALAGENS_CADASTRADAS}`,
    titulo: "Embalagens Cadastradas"
  }
];

export default () => (
  <Page
    titulo={atual.titulo}
    botaoVoltar
    voltarPara={`/${CONFIGURACOES}/${CADASTROS}/${EMBALAGENS_CADASTRADAS}`}
  >
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <CadastroEmbalagem />
  </Page>
);
