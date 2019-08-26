import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import DetailDREContainer from "../../components/screens/DashboardCODAE/DetailDREContainer";
import { HOME } from "./constants";

export default () => (
  <Page>
    <Breadcrumb home={HOME} />
    <DetailDREContainer />
  </Page>
);
