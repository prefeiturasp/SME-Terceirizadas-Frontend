import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import DashboardTerceirizadaContainer from "../../components/screens/DashboardTerceirizada/DashboardTerceirizadaContainer";
import { HOME } from "./constants";

export default () => (
  <div>
    <Page>
      <Breadcrumb home={HOME} />
      <DashboardTerceirizadaContainer />
    </Page>
  </div>
);
