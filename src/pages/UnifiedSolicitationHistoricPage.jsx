import React from "react";
import Page from "../components/Shareable/Page/Page";
import UnifiedSolicitationFilledForm from "../components/SolicitacaoUnificada/UnifiedSolicitationFilledForm";

export default props => (
  <Page titulo="Pedidos - Solicitação Unificada" tituloRastro="solicitações">
    <UnifiedSolicitationFilledForm />
  </Page>
);
