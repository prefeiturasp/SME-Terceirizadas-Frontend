import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import Container from "../../components/screens/DashboardCODAE/Container";
import { HOME } from "./constants";

export default () => (
  <div>
    <Page>
      <Breadcrumb home={HOME} />
      <Container />
    </Page>
  </div>
);
