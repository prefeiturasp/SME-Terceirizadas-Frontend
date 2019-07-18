import React from "react";
import Page from "../../components/Shareable/Page/Page";
import EmailConfiguration from "../../components/screens/email/EmailConfiguration";

export default props => (
  <Page titulo="Configurações de E-mail" tituloRastro="Configurações">
    <EmailConfiguration />
  </Page>
);
