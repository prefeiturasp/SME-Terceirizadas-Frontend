import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import GerenciamentoEmails from "../../components/screens/Configuracoes/GerenciamentoEmails/GerenciamentoEmails";
import { CONFIGURACOES, GERENCIAMENTO_EMAILS } from "../../configs/constants";

const atual = {
  href: `/${CONFIGURACOES}/${GERENCIAMENTO_EMAILS}`,
  titulo: "Gerenciamento de E-mails",
};

const anteriores = [
  {
    href: `/`,
    titulo: "Configurações",
  },
];

export default () => (
  <div>
    <Page titulo={atual.titulo} botaoVoltar voltarPara={"/"}>
      <Breadcrumb home={"/"} anteriores={anteriores} atual={atual} />
      <GerenciamentoEmails />
    </Page>
  </div>
);
