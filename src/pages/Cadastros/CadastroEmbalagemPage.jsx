import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import CadastroEmbalagem from "components/screens/Cadastros/Embalagens/components/CadastroEmbalagem";
import Page from "../../components/Shareable/Page/Page";
import {
  CADASTROS,
  CONFIGURACOES,
  CADASTRO_EMBALAGEM,
  EMBALAGENS_CADASTRADAS,
} from "../../configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${CADASTRO_EMBALAGEM}`,
  titulo: "Cadastro de Embalagem",
};

const anteriores = [
  {
    href: `/${CONFIGURACOES}/${CADASTROS}`,
    titulo: "Cadastros",
  },
  {
    href: `/${CONFIGURACOES}/${CADASTROS}/${EMBALAGENS_CADASTRADAS}`,
    titulo: "Embalagens",
  },
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
