import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import EmailConfiguration from "../../components/screens/email/EmailConfiguration";
import { CONFIGURACOES } from "../../configs/constants";

const atual = {
  href: `/${CONFIGURACOES}`,
  titulo: "Configuração de E-mail"
};

export default () => (
  <div>
    <Page titulo={atual.titulo} botaoVoltar voltarPara={"/"}>
      <Breadcrumb atual={atual} home={"/"} />
      <EmailConfiguration />
    </Page>
  </div>
);
