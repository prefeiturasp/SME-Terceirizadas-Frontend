import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import DashboardCODAEContainer from "../../components/screens/DashboardCODAE/DashboardCODAEContainer";
import { HOME } from "./constants";

export default () => (
  <div>
    <Page>
      <Breadcrumb home={HOME} />
      <DashboardCODAEContainer />
    </Page>
  </div>
);
