import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import Mensagem from '../../components/screens/Configuracoes/Mensagem';

export default () => (
  <div>
    <Page titulo="Configurações de Mensagem">
      <Breadcrumb home={"/"} />
      <Mensagem />
    </Page>
  </div>
);
