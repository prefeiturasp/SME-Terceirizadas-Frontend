import React from "react";
import StatusSolicitacoesTerceirizada from "../../components/screens/DashboardTerceirizada/StatusSolicitacoesTerceirizada";
import Page from "../../components/Shareable/Page/Page";

export default props => (
  <Page titulo={"Painel de Status de Solicitações"} tituloRastro="solicitações">
    <StatusSolicitacoesTerceirizada />
  </Page>
);
