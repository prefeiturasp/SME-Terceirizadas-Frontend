import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import DashboardEscolaContainer from "../../components/screens/DashboardEscola/DashboardEscolaContainer";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "./constants";

export default () => (
  <div>
    <Page>
      <Breadcrumb home={HOME} />
      <DashboardEscolaContainer />
    </Page>
  </div>
);
