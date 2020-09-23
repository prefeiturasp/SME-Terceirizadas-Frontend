import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import PainelInicial from "../../components/screens/PainelInicial";
import Page from "../../components/Shareable/Page/Page";

export default () => (
  <div>
    <Page>
      <Breadcrumb home={"/"} />
      <PainelInicial />
    </Page>
  </div>
);
