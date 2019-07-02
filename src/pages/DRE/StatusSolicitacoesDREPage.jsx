import React from "react";
import StatusSolicitacoes from "../../components/screens/DashboardDRE/StatusSolicitacoes";
import Page from "../../components/Shareable/Page";

export default props => (
  <Page titulo={"Painel de Status de Solicitações"} tituloRastro="solicitações">
    <StatusSolicitacoes />
  </Page>
);
