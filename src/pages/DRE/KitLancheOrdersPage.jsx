import React from "react";
import Page from "../../components/Shareable/Page";
import OrdersDashboardContainer from "../../components/TourRequest/DRE/OrdersDashboardContainer";

export default props => (
  <Page titulo={"Kits Lanche - Pendentes Aprovação"} tituloRastro="solicitações">
    <OrdersDashboardContainer />
  </Page>
);
