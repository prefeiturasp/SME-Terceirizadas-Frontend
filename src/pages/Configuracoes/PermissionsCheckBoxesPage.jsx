import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import PermissionsCheckBoxes from "../../components/Permissions/PermissionsCheckBoxes";

export default () => (
  <div>
    <Page titulo="Configuração de E-mail">
      <Breadcrumb home={"/"} />
      <PermissionsCheckBoxes />
    </Page>
  </div>
);
