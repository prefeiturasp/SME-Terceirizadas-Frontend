import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import DashboardNutriManifestacaoContainer from "../../components/screens/DashboardNutricionista/DashboardNutriManifestacaoContainer.jsx";
import Page from "../../components/Shareable/Page/Page";
import { HOME } from "./constants";

export default () => (
  <div>
    <Page>
      <Breadcrumb home={HOME} />
      <DashboardNutriManifestacaoContainer />
    </Page>
  </div>
);
