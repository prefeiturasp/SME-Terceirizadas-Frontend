import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import DashboardDREContainer from "../../components/screens/DashboardDRE/DashboardDREContainer";
import { HOME } from "./constants";

export default () => (
  <div>
    <Page>
      <Breadcrumb home={HOME} />
      <DashboardDREContainer />
    </Page>
  </div>
);
