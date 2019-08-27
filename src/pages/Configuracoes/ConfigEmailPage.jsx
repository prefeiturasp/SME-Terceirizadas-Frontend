import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import EmailConfiguration from "../../components/screens/email/EmailConfiguration";

export default () => (
  <div>
    <Page titulo="Configuração de E-mail">
      <Breadcrumb home={"/"} />
      <EmailConfiguration />
    </Page>
  </div>
);
