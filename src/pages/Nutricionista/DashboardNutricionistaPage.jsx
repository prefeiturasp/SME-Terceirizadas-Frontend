import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import DashboardNutricionistaContainer from "../../components/screens/DashboardNutricionista/DashboardNutricionistaContainer";
import Page from "../../components/Shareable/Page/Page";
//import { HOME } from "./constants";

export default () => (
  <div>
    <Page>
      <Breadcrumb home={"/"} />
      <DashboardNutricionistaContainer />
    </Page>
  </div>
);
