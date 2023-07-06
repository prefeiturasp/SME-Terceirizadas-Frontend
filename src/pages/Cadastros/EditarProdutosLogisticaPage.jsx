import React from "react";
import Breadcrumb from "components/Shareable/Breadcrumb";
import Page from "components/Shareable/Page/Page";
import CadastroProdutosLogistica from "components/screens/Cadastros/CadastroProdutosLogistica";
import {
  CADASTROS,
  CONFIGURACOES,
  EDICAO_PRODUTOS,
  PRODUTOS
} from "configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${CADASTROS}/${EDICAO_PRODUTOS}`,
  titulo: "Editar Cadastro de Produto"
};

export default () => (
  <Page
    titulo={atual.titulo}
    botaoVoltar
    voltarPara={`/${CONFIGURACOES}/${CADASTROS}/${PRODUTOS}`}
  >
    <Breadcrumb home={"/"} atual={atual} />
    <CadastroProdutosLogistica />
  </Page>
);
