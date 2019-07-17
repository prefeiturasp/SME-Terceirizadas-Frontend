import React from "react";
import Page from "../../components/Shareable/Page/Page";
import PermissionsCheckBoxes from "../../components/Permissions/PermissionsCheckBoxes";

export default props => (
  <Page tituloRastro="Configurações">
    <PermissionsCheckBoxes {...props} />
  </Page>
);
