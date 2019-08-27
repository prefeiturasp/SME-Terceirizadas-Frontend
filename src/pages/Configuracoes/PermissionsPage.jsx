import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import PermissionsContainer from "../../components/Permissions/PermissionsContainer";
import Page from "../../components/Shareable/Page/Page";

export default () => (
  <div>
    <Page titulo="Permissões">
      <Breadcrumb home={"/"} />
      <PermissionsContainer />
    </Page>
  </div>
);
