import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import LotesCadastrados from "../../components/screens/Cadastros/CadastroLote/components/LotesCadastrados";
import Page from "../../components/Shareable/Page/Page";
import {
  CADASTROS,
  CONFIGURACOES,
  LOTE,
  LOTES_CADASTRADOS
} from "../../configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${LOTES_CADASTRADOS}`,
  titulo: "Lotes Cadastrados"
};

const anteriores = [
  {
    href: `/${CONFIGURACOES}/${CADASTROS}`,
    titulo: "Cadastros"
  },
  {
    href: `/${CONFIGURACOES}/${CADASTROS}/${LOTE}`,
    titulo: "Lote"
  }
];

export default () => (
  <Page
    titulo={atual.titulo}
    botaoVoltar
    voltarPara={`/${CONFIGURACOES}/${CADASTROS}/${LOTE}`}
  >
    <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
    <LotesCadastrados />
  </Page>
);
