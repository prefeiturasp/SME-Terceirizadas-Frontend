import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import Mensagem from "../../components/screens/Configuracoes/Mensagem";
import { CONFIGURACOES, MENSAGEM } from "../../configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${MENSAGEM}`,
  titulo: "Configuração de Mensagem"
};

export default () => (
  <div>
    <Page titulo={atual.titulo} botaoVoltar voltarPara={"/"}>
      <Breadcrumb home={"/"} atual={atual} />
      <Mensagem />
    </Page>
  </div>
);
