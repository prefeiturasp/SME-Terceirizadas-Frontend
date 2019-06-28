import React from "react";
import Page from "../components/Shareable/Page";
import UnifiedSolicitationContainer from "../components/UnifiedSolicitation/UnifiedSolicitationContainer";

export default props => (
  <Page titulo={"Solicitação Unificada"} tituloRastro="solicitações">
    <UnifiedSolicitationContainer />
  </Page>
);
