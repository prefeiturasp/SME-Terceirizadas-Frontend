import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import EmbalagensCadastradas from "components/screens/Cadastros/CadastroEmbalagem/EmbalagensCadastradas";
import Page from "../../components/Shareable/Page/Page";
import {
  CADASTROS,
  CONFIGURACOES,
  EMBALAGEM,
  EMBALAGENS_CADASTRADAS
} from "../../configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${EMBALAGENS_CADASTRADAS}`,
  titulo: "Embalagens Cadastradas"
};

const anteriores = [
  {
    href: `/${CONFIGURACOES}/${CADASTROS}`,
    titulo: "Cadastros"
  },
  {
    href: `/${CONFIGURACOES}/${CADASTROS}/${EMBALAGEM}`,
    titulo: "Cadastro de Embalagens"
  }
];

export default () => (
  <Page
    titulo={atual.titulo}
    botaoVoltar
    voltarPara={`/${CONFIGURACOES}/${CADASTROS}/${EMBALAGEM}`}
  >
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <EmbalagensCadastradas />
  </Page>
);
