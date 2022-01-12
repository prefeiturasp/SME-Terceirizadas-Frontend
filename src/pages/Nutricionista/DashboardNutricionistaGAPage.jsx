import React from "react";
import Breadcrumb from "../../components/Shareable/Breadcrumb";
import GestaoDeAlimentacaoDashboard from "../../components/screens/DashboardNutricionista/GestaoDeAlimentacaoDashboard.jsx";
import Page from "../../components/Shareable/Page/Page";

export default () => (
  <div>
    <Page>
      <Breadcrumb home={"/"} />
      <GestaoDeAlimentacaoDashboard />
    </Page>
  </div>
);
